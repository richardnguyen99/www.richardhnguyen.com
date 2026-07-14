import fs from "node:fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { GlossaryDictType, RawGlossaryDict } from "./types";

const mdToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

export async function readGlossaryDict(): Promise<GlossaryDictType> {
  "use cache";

  const filePath = path.join(
    process.cwd(),
    "src",
    "components",
    "glossary",
    "glossary-dict.json",
  );
  const data = await fs.promises.readFile(filePath, "utf-8");
  const rawDict = JSON.parse(data) as RawGlossaryDict;

  const processedDict: GlossaryDictType = {};
  for (const [key, value] of Object.entries(rawDict)) {
    const raw = String(await mdToHtml.process(value.definition)).trim();
    const closingCount = (raw.match(/<\/p>/g) ?? []).length;
    const definitionHtml = closingCount === 1 ? raw.slice(3, -4) : raw;
    processedDict[key] = { ...value, definitionHtml };
  }

  return processedDict;
}

export async function groupGlossaryKeyByFirstLetter(
  glossaryDict?: GlossaryDictType,
): Promise<Record<string, string[]>> {
  const loadedGlossaryDict = glossaryDict ?? (await readGlossaryDict());

  const groupedGlossary: Record<string, string[]> = {};

  for (const key of Object.keys(loadedGlossaryDict)) {
    const firstLetter = key[0].toLowerCase();
    if (!groupedGlossary[firstLetter]) {
      groupedGlossary[firstLetter] = [];
    }
    groupedGlossary[firstLetter].push(key);
  }

  return groupedGlossary;
}
