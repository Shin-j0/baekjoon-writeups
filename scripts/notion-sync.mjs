import fs from "fs";
import path from "path";
import slugify from "slugify";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error("Missing NOTION_TOKEN or NOTION_DATABASE_ID");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const ROOT = path.join(process.cwd(), "docs", "baekjoon");
const PROBLEMS_DIR = path.join(ROOT, "problems");
const README_PATH = path.join(process.cwd(), "README.md");

// Notion DB 컬럼명(네 DB 기준)
const COL = {
  number: "문제번호",
  tier: "Select",
  algos: "알고리즘",
  published: "Published",
  date: "날짜",
};

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

function getTitle(page) {
  for (const key of Object.keys(page.properties)) {
    const p = page.properties[key];
    if (p.type === "title") {
      return (p.title?.map((t) => t.plain_text).join("") || "untitled").trim();
    }
  }
  return "untitled";
}

const getNumber = (page, k) =>
  page.properties?.[k]?.type === "number" ? page.properties[k].number : null;

const getSelect = (page, k) =>
  page.properties?.[k]?.type === "select"
    ? page.properties[k].select?.name ?? null
    : null;

const getMulti = (page, k) =>
  page.properties?.[k]?.type === "multi_select"
    ? page.properties[k].multi_select.map((x) => x.name)
    : [];

const getCheck = (page, k) =>
  page.properties?.[k]?.type === "checkbox" ? !!page.properties[k].checkbox : false;

const getDate = (page, k) =>
  page.properties?.[k]?.type === "date" ? page.properties[k].date?.start ?? null : null;

const yamlValue = (v) =>
  v === null || v === undefined
    ? "null"
    : typeof v === "boolean" || typeof v === "number"
      ? String(v)
      : JSON.stringify(String(v));

const algoFolder = (a) => slugify(a, { lower: true, strict: true }) || "etc";

// 티어 정렬용 점수(큰 값이 더 상위)
function tierScore(tier) {
  if (!tier) return -1;

  // 예: "GOLD 5"
  const parts = String(tier).trim().split(/\s+/);
  if (parts.length < 2) return -1;

  const name = parts[0].toUpperCase();
  const level = Number(parts[1]);

  const baseMap = {
    BRONZE: 200,
    SILVER: 300,
    GOLD: 400,
    PLATINUM: 500,
    DIAMOND: 600,
    RUBY: 700, // 혹시 생기면
  };

  const base = baseMap[name] ?? 0;
  if (!base || !Number.isFinite(level)) return -1;

  // 1이 가장 높고 5가 가장 낮게 보이도록 (같은 티어 내)
  // GOLD 1 > GOLD 2 > ... > GOLD 5
  return base + (6 - level);
}

async function queryPublishedPages() {
  const results = [];
  let cursor = undefined;

  while (true) {
    const resp = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
      filter: { property: COL.published, checkbox: { equals: true } },
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    results.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor;
  }
  return results;
}

/**
 * README에서 자동 영역만 갱신(전체 덮어쓰기 X)
 * - 마커가 있으면 그 사이만 교체
 * - 마커가 없으면 맨 아래에 블록 추가
 */
function upsertAutoSection(readmePath, autoContent) {
  const start = "<!-- AUTO-GENERATED:START -->";
  const end = "<!-- AUTO-GENERATED:END -->";
  const block = `${start}\n${autoContent}\n${end}`;

  let cur = "";
  try {
    cur = fs.readFileSync(readmePath, "utf8");
  } catch {
    fs.writeFileSync(readmePath, `# baekjoon-writeups\n\n${block}\n`, "utf8");
    return;
  }

  if (cur.includes(start) && cur.includes(end)) {
    const updated = cur.replace(new RegExp(`${start}[\\s\\S]*?${end}`), block);
    fs.writeFileSync(readmePath, updated, "utf8");
  } else {
    fs.writeFileSync(readmePath, `${cur}\n\n${block}\n`, "utf8");
  }
}

async function buildMarkdown(page) {
  const title = getTitle(page);
  const boj = getNumber(page, COL.number);
  const tier = getSelect(page, COL.tier);
  const algos = getMulti(page, COL.algos);
  const date = getDate(page, COL.date);

  const fm = [
    "---",
    `title: ${yamlValue(title)}`,
    `boj: ${yamlValue(boj)}`,
    `tier: ${yamlValue(tier)}`,
    `algorithms: ${yamlValue(algos)}`,
    `date: ${yamlValue(date)}`,
    "---",
    "",
  ].join("\n");

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const md = n2m.toMarkdownString(mdBlocks)?.parent ?? "";

  return { title, boj, tier, date, algos, content: fm + md + "\n" };
}

function toTable(header, rows) {
  return [header, ...rows].join("\n");
}

function safeBojStr(boj) {
  if (boj === null || boj === undefined) return "unknown";
  return String(boj);
}

function makeReadmeAuto(stats) {
  const tierRows = [...stats.byTier.entries()]
    .sort((a, b) => tierScore(b[0]) - tierScore(a[0]))
    .map(([tier, cnt]) => `| ${tier} | ${cnt} |`);

  const algoRows = [...stats.byAlgo.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([algo, cnt]) => `| ${algo} | ${cnt} |`);

  const latestRows = stats.latest.map((x) => {
    const bojStr = safeBojStr(x.boj);
    const problemLink = x.boj ? `https://www.acmicpc.net/problem/${x.boj}` : null;

    const bojCell = problemLink ? `[${bojStr}](${problemLink})` : bojStr;
    const titleCell = `[${x.title}](docs/baekjoon/problems/${bojStr}.md)`;
    const algostr = (x.algos ?? []).join(", ");

    return `| ${bojCell} | ${titleCell} | ${x.tier ?? ""} | ${algostr} | ${x.date ?? ""} |`;
  });

  const tierTable = toTable(
    `### By Tier
| Tier | Count |
|---|---:|`,
    tierRows.length ? tierRows : ["| - | 0 |"]
  );

  const algoTable = toTable(
    `### By Algorithm
| Algorithm | Count |
|---|---:|`,
    algoRows.length ? algoRows : ["| - | 0 |"]
  );

  const latestTable = toTable(
    `## Latest (Top 10)
| BOJ | Write-up | Tier | Algorithms | Date |
|---:|---|---|---|---|`,
    latestRows.length ? latestRows : ["| - | - | - | - | - |"]
  );

  return `
## Stats
- Total published: **${stats.total}**

${tierTable}

${algoTable}

${latestTable}
`.trim();
}

function makeAlgoIndex(algoName, entries) {
  // entries: [{boj,title,tier,date}]
  // 최신순(날짜)
  const sorted = [...entries].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  const rows = sorted.map((x) => {
    const bojStr = safeBojStr(x.boj);
    const problemLink = x.boj ? `https://www.acmicpc.net/problem/${x.boj}` : null;

    const bojCell = problemLink ? `[${bojStr}](${problemLink})` : bojStr;
    const titleCell = `[${x.title}](../problems/${bojStr}.md)`;

    return `| ${bojCell} | ${titleCell} | ${x.tier ?? ""} | ${x.date ?? ""} |`;
  });

  return `# ${algoName}

| BOJ | Title | Tier | Date |
|---:|---|---|---|
${rows.length ? rows.join("\n") : "| - | - | - | - |"}
`;
}

async function main() {
  ensureDir(ROOT);
  ensureDir(PROBLEMS_DIR);

  const pages = await queryPublishedPages();

  // 통계 + 인덱스용 데이터
  const stats = {
    total: 0,
    byAlgo: new Map(), // algo -> count
    byTier: new Map(), // tier -> count
    latest: [], // {boj,title,tier,algos,date}
  };

  const algoEntries = new Map(); // algo -> [{boj,title,tier,date}]

  if (pages.length === 0) {
    console.log("No Published pages found.");
    upsertAutoSection(README_PATH, makeReadmeAuto(stats));
    return;
  }

  for (const page of pages) {
    if (!getCheck(page, COL.published)) continue;

    const { title, boj, tier, date, algos, content } = await buildMarkdown(page);

    const bojStr = safeBojStr(boj);
    const algoList = (algos && algos.length) ? algos : ["etc"];

    // 1) problems/에 딱 한 번만 저장
    const problemPath = path.join(PROBLEMS_DIR, `${bojStr}.md`);
    fs.writeFileSync(problemPath, content, "utf8");

    // 2) 통계 집계
    stats.total++;
    if (tier) stats.byTier.set(tier, (stats.byTier.get(tier) ?? 0) + 1);

    for (const a of algoList) {
      stats.byAlgo.set(a, (stats.byAlgo.get(a) ?? 0) + 1);

      if (!algoEntries.has(a)) algoEntries.set(a, []);
      algoEntries.get(a).push({ boj, title, tier, date });
    }

    // 3) 최신 목록
    stats.latest.push({ boj, title, tier, algos: algoList, date });

    console.log(`✓ ${bojStr} ${title} -> ${algoList.join(", ")}`);
  }

  // 최신 10개 (날짜 기준)
  stats.latest.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  stats.latest = stats.latest.slice(0, 10);

  // README 자동영역 갱신
  upsertAutoSection(README_PATH, makeReadmeAuto(stats));

  // 알고리즘별 index.md 생성
  for (const [algo, entries] of algoEntries.entries()) {
    const dir = path.join(ROOT, algoFolder(algo));
    ensureDir(dir);
    const indexPath = path.join(dir, "index.md");
    fs.writeFileSync(indexPath, makeAlgoIndex(algo, entries), "utf8");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
