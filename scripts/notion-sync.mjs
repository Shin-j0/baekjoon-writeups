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

const OUT_ROOT = path.join(process.cwd(), "docs", "baekjoon");
const README_PATH = path.join(process.cwd(), "README.md");

const COL = {
  number: "문제번호",
  tier: "Select",
  algos: "알고리즘",
  published: "Published",
  date: "날짜"
};

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });

function getTitle(page) {
  for (const key of Object.keys(page.properties)) {
    const p = page.properties[key];
    if (p.type === "title") return (p.title?.map(t => t.plain_text).join("") || "untitled").trim();
  }
  return "untitled";
}
const getNumber = (page, k) => page.properties?.[k]?.type === "number" ? page.properties[k].number : null;
const getSelect = (page, k) => page.properties?.[k]?.type === "select" ? page.properties[k].select?.name ?? null : null;
const getMulti = (page, k) => page.properties?.[k]?.type === "multi_select" ? page.properties[k].multi_select.map(x=>x.name) : [];
const getCheck = (page, k) => page.properties?.[k]?.type === "checkbox" ? !!page.properties[k].checkbox : false;
const getDate = (page, k) => page.properties?.[k]?.type === "date" ? page.properties[k].date?.start ?? null : null;

const yamlValue = (v) => (v === null || v === undefined) ? "null" :
  (typeof v === "boolean" || typeof v === "number") ? String(v) : JSON.stringify(String(v));

const algoFolder = (a) => slugify(a, { lower: true, strict: true }) || "etc";
const safeSlug = (t) => slugify(t, { lower: true, strict: true }) || "untitled";

async function queryPublishedPages() {
  const results = [];
  let cursor = undefined;

  while (true) {
    const resp = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
      filter: { property: COL.published, checkbox: { equals: true } },
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }]
    });

    results.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor;
  }
  return results;
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
    ""
  ].join("\n");

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const md = n2m.toMarkdownString(mdBlocks)?.parent ?? "";
  return { title, boj, tier, date, algos, content: fm + md + "\n" };
}

async function main() {
  ensureDir(OUT_ROOT);

  const pages = await queryPublishedPages();
  if (pages.length === 0) return console.log("No Published pages found.");
  const stats = {
    total: 0,
    byAlgo: new Map(),
    byTier: new Map(),
    latest: []
  };
  for (const page of pages) {
    if (!getCheck(page, COL.published)) continue;
    const { title, boj, tier, date, algos, content } = await buildMarkdown(page);
    stats.total++;

    if (tier) stats.byTier.set(tier, (stats.byTier.get(tier) ?? 0) + 1);

    const algoList = algos.length ? algos : ["etc"];
    for (const a of algoList) {
      stats.byAlgo.set(a, (stats.byAlgo.get(a) ?? 0) + 1);
    }

    // 최신 10개만 저장
    stats.latest.push({ boj, title, tier, algos: algoList, date });

    const list = algos.length ? algos : ["etc"];
    const filename = `${boj ?? "unknown"}.md`;

    for (const a of list) {
      const dir = path.join(OUT_ROOT, algoFolder(a));
      ensureDir(dir);
      fs.writeFileSync(path.join(dir, filename), content, "utf8");
    }
    console.log(`✓ ${boj} ${title} -> ${list.join(", ")}`);
  }
    // 최신순 정렬(날짜 없으면 뒤로)
  stats.latest.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  stats.latest = stats.latest.slice(0, 10);

  const algoRows = [...stats.byAlgo.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([algo, cnt]) => `| ${algo} | ${cnt} |`)
    .join("\n");

  const tierRows = [...stats.byTier.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tier, cnt]) => `| ${tier} | ${cnt} |`)
    .join("\n");

  const latestRows = stats.latest
    .map(x => {
      const file = `${x.boj ?? "unknown"}-${safeSlug(x.title)}.md`;
      const firstAlgo = x.algos?.[0] ?? "etc";
      const linkPath = `docs/baekjoon/${algoFolder(firstAlgo)}/${file}`;
      const algostr = (x.algos ?? []).join(", ");
      return `| [${x.boj}](${`https://www.acmicpc.net/problem/${x.boj}`}) | [${x.title}](${linkPath}) | ${x.tier ?? ""} | ${algostr} | ${x.date ?? ""} |`;
    })
    .join("\n");

  const readme = `# baekjoon-writeups

Notion에 정리한 백준 풀이를 GitHub로 자동 동기화합니다.  
(✅ Published 체크된 항목만 반영)

## Stats
- Total published: **${stats.total}**

### By Tier
| Tier | Count |
|---|---:|
${tierRows || "| - | 0 |"}

### By Algorithm
| Algorithm | Count |
|---|---:|
${algoRows || "| - | 0 |"}

## Latest (Top 10)
| BOJ | Write-up | Tier | Algorithms | Date |
|---:|---|---|---|---|
${latestRows || "| - | - | - | - | - |"}
`;

  fs.writeFileSync(README_PATH, readme, "utf8");
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
