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

// ✅ 코드 레포 링크 자동 생성용 (workflow env로 주는 걸 추천)
const CODE_REPO_URL = (process.env.CODE_REPO_URL || "").replace(/\/$/, "");
const CODE_REPO_BRANCH = process.env.CODE_REPO_BRANCH || "main";

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

  // ✅ (옵션) Notion에 직접 코드 링크를 넣고 싶으면 URL 타입으로 추가
  codeUrl: "Code URL",
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

const getUrl = (page, k) =>
  page.properties?.[k]?.type === "url" ? page.properties[k].url ?? null : null;

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
    RUBY: 700,
  };

  const base = baseMap[name] ?? 0;
  if (!base || !Number.isFinite(level)) return -1;

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

function toTable(header, rows) {
  return [header, ...rows].join("\n");
}

function safeBojStr(boj) {
  if (boj === null || boj === undefined) return "unknown";
  return String(boj);
}

// ✅ 자동 코드 링크 생성 (Notion Code URL이 있으면 그걸 우선)
function makeCodeLink({ boj, algos, explicitCodeUrl }) {
  if (explicitCodeUrl) return explicitCodeUrl;

  if (!CODE_REPO_URL) return null; // env 설정 안 했으면 링크 생성 안 함
  if (!boj) return null;

  const list = (algos && algos.length) ? algos : ["etc"];
  const algo0 = list[0] ?? "etc";
  const folder = algoFolder(algo0);

  // 기본: C++ 파일로 가정
  return `${CODE_REPO_URL}/blob/${CODE_REPO_BRANCH}/${folder}/${boj}.cpp`;
}

// ✅ 문제 md에 코드 링크를 “보이는 형태”로 삽입
function injectCodeSection(md, codeUrl) {
  if (!codeUrl) return md;

  const block =
    `\n\n---\n` +
    `## 🔗 Solution Code\n` +
    `- ${codeUrl}\n`;

  return md + block + "\n";
}

async function buildMarkdown(page) {
  const title = getTitle(page);
  const boj = getNumber(page, COL.number);
  const tier = getSelect(page, COL.tier);
  const algos = getMulti(page, COL.algos);
  const date = getDate(page, COL.date);

  // Notion에서 직접 넣은 코드 링크가 있으면 그걸 쓰게 함
  const explicitCodeUrl = getUrl(page, COL.codeUrl);

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
  const mdBody = n2m.toMarkdownString(mdBlocks)?.parent ?? "";

  const codeUrl = makeCodeLink({ boj, algos, explicitCodeUrl });

  // ✅ 본문 끝에 코드 링크 섹션 붙이기
  const finalMd = injectCodeSection(fm + mdBody, codeUrl);

  return { title, boj, tier, date, algos, codeUrl, content: finalMd + "\n" };
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
    const writeupCell = `[${x.title}](docs/baekjoon/problems/${bojStr}.md)`;
    const algostr = (x.algos ?? []).join(", ");

    const codeCell = x.codeUrl ? `[code](${x.codeUrl})` : "";

    return `| ${bojCell} | ${writeupCell} | ${x.tier ?? ""} | ${algostr} | ${codeCell} | ${x.date ?? ""} |`;
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
| BOJ | Write-up | Tier | Algorithms | Code | Date |
|---:|---|---|---|---|---|`,
    latestRows.length ? latestRows : ["| - | - | - | - | - | - |"]
  );

  // ✅ 코드 레포 버튼(있을 때만)
  const codeRepoLine = CODE_REPO_URL
    ? `- Code repo: **${CODE_REPO_URL}**`
    : `- Code repo: (set \`CODE_REPO_URL\` to show link)`;

  return `
## Links
${codeRepoLine}

## Stats
- Total published: **${stats.total}**

${tierTable}

${algoTable}

${latestTable}
`.trim();
}

function makeAlgoIndex(algoName, entries) {
  const sorted = [...entries].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  const rows = sorted.map((x) => {
    const bojStr = safeBojStr(x.boj);
    const problemLink = x.boj ? `https://www.acmicpc.net/problem/${x.boj}` : null;

    const bojCell = problemLink ? `[${bojStr}](${problemLink})` : bojStr;
    const titleCell = `[${x.title}](../problems/${bojStr}.md)`;
    const codeCell = x.codeUrl ? `[code](${x.codeUrl})` : "";

    return `| ${bojCell} | ${titleCell} | ${x.tier ?? ""} | ${codeCell} | ${x.date ?? ""} |`;
  });

  return `# ${algoName}

| BOJ | Title | Tier | Code | Date |
|---:|---|---|---|---|
${rows.length ? rows.join("\n") : "| - | - | - | - | - |"}
`;
}

async function main() {
  ensureDir(ROOT);
  ensureDir(PROBLEMS_DIR);

  const pages = await queryPublishedPages();

  const stats = {
    total: 0,
    byAlgo: new Map(),
    byTier: new Map(),
    latest: [], // {boj,title,tier,algos,date,codeUrl}
  };

  const algoEntries = new Map(); // algo -> [{boj,title,tier,date,codeUrl}]

  if (pages.length === 0) {
    console.log("No Published pages found.");
    upsertAutoSection(README_PATH, makeReadmeAuto(stats));
    return;
  }

  for (const page of pages) {
    if (!getCheck(page, COL.published)) continue;

    const { title, boj, tier, date, algos, codeUrl, content } = await buildMarkdown(page);

    const bojStr = safeBojStr(boj);
    const algoList = (algos && algos.length) ? algos : ["etc"];

    // ✅ problems/에 문제 파일은 1개만 생성
    fs.writeFileSync(path.join(PROBLEMS_DIR, `${bojStr}.md`), content, "utf8");

    // stats
    stats.total++;
    if (tier) stats.byTier.set(tier, (stats.byTier.get(tier) ?? 0) + 1);

    for (const a of algoList) {
      stats.byAlgo.set(a, (stats.byAlgo.get(a) ?? 0) + 1);
      if (!algoEntries.has(a)) algoEntries.set(a, []);
      algoEntries.get(a).push({ boj, title, tier, date, codeUrl });
    }

    stats.latest.push({ boj, title, tier, algos: algoList, date, codeUrl });

    console.log(`✓ ${bojStr} ${title} -> ${algoList.join(", ")}`);
  }

  // 최신 10개
  stats.latest.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  stats.latest = stats.latest.slice(0, 10);

  // README 자동영역 갱신
  upsertAutoSection(README_PATH, makeReadmeAuto(stats));

  // 알고리즘별 index.md 생성
  for (const [algo, entries] of algoEntries.entries()) {
    const dir = path.join(ROOT, algoFolder(algo));
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, "index.md"), makeAlgoIndex(algo, entries), "utf8");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
