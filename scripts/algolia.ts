import fs from "fs/promises";
import { algoliasearch } from "algoliasearch";
import dotenv from "dotenv";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { InternalSearchAlgoliaAttributes } from "@/types/algolia";
import { getMdxContentFromPath } from "@/lib/mdx";

function extractHeadings(content: string) {
  const headings: {
    depth: number;
    text: string;
  }[] = [];

  const parsed = unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkMdx) // Support MDX
    .parse(content);

  visit(parsed, "heading", (node) => {
    if (node.depth >= 1 && node.depth < 3) {
      let text = "";

      visit(node, "text", (textNode) => {
        if (text.length > 0) {
          text += " ";
        }

        text += textNode.value;
      });

      headings.push({
        depth: node.depth,
        text,
      });
    }
  });

  return headings;
}

dotenv.config({
  path: ".env.production.local",
});

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_KEY as string,
);

const generateImageUrl = (fileName: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || process.env.METADATA_BASE;
  return `${baseUrl}_next/image?url=${encodeURIComponent(fileName)}&w=1920&q=100`;
};

const processRecords = async () => {
  const postPath = path.resolve(process.cwd(), "src", "posts");
  const files = await fs.readdir(postPath);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.resolve(postPath, file);
      const { frontMatter, body, excerpt } =
        await getMdxContentFromPath(filePath);

      return {
        objectID: file.replace(".mdx", ""),
        title: frontMatter.title,
        description: excerpt || "",
        publishedAt: frontMatter.publishedAt,
        published: frontMatter.published,
        tags: frontMatter.tags,
        headings: extractHeadings(body),
        imageUrl: generateImageUrl(frontMatter.thumbnail),
      } satisfies InternalSearchAlgoliaAttributes & {
        objectID: string;
        published: boolean;
      };
    }),
  );

  const objects = posts.filter((post) => post.published);

  objects.forEach((post) => {
    console.log("Post: ", post);
  });

  return await client.saveObjects({
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string,
    objects,
  });
};

processRecords()
  .then(() => {
    console.log("Successfully indexed records");
  })
  .catch((err) => {
    console.error(err);
  });
