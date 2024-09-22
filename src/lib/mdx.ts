import * as path from "node:path";
import * as fs from "node:fs/promises";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";

const EXCERPT_SEPARATOR = "{/* EXCERPT */}";

export type SortOrder = "asc" | "desc";

export interface ChangeLog {
  readonly date: Date;
  readonly changes: Array<string>;
}

export interface FrontMatter {
  readonly title: string;
  readonly slug: string;
  readonly date: Date;
  readonly published: boolean;
  readonly publishedAt: Date;
  readonly author: string;
  readonly tags: string[];
  readonly category: string;
  readonly thumbnail: string;
  readonly changeLog: Array<ChangeLog>;
}

export interface MdxContent {
  readonly frontMatter: FrontMatter;
  readonly excerpt?: string;
  readonly body: string;
}

const validateFrontMatter = (
  frontmatter: Record<string, any>,
): frontmatter is FrontMatter => {
  if (!frontmatter.title || typeof frontmatter.title !== "string") {
    throw new Error(
      `Title is required and must be a string (Got ${frontmatter.title})`,
    );
  }

  if (!frontmatter.date || !(Date.parse(frontmatter.date) > 0)) {
    throw new Error(
      `Date is required and must be a valid date string (Got ${frontmatter.date})`,
    );
  }

  if (typeof frontmatter.published !== "boolean") {
    throw new Error(
      `Published is required and must be a boolean (Got ${frontmatter.published})`,
    );
  }

  if (!frontmatter.publishedAt || !(Date.parse(frontmatter.publishedAt) > 0)) {
    throw new Error(
      `PublishedAt is required and must be a valid date string (Got ${frontmatter.publishedAt})`,
    );
  }

  if (!frontmatter.author || typeof frontmatter.author !== "string") {
    throw new Error(
      `Author is required and must be a string (Got ${frontmatter.author})`,
    );
  }

  if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
    throw new Error(
      `Tags is required and must be an array (Got ${frontmatter.tags})`,
    );
  }

  if (!frontmatter.category || typeof frontmatter.category !== "string") {
    throw new Error(
      `Category is required and must be a string (Got ${frontmatter.category})`,
    );
  }

  if (!frontmatter.changeLog || !Array.isArray(frontmatter.changeLog)) {
    throw new Error(
      `ChangeLog is required and must be an array (Got ${frontmatter.changeLog})`,
    );
  }

  frontmatter.changeLog.forEach((entry: Record<string, string>) => {
    if (!entry.date || !(Date.parse(entry.date) > 0)) {
      throw new Error(
        `ChangeLog date is required and must be a valid date string (Got ${entry.date})`,
      );
    }

    if (!entry.changes || !Array.isArray(entry.changes)) {
      throw new Error(
        `ChangeLog change is required and must be a string (Got ${entry.changes})`,
      );
    }

    entry.changes.forEach((change) => {
      if (typeof change !== "string") {
        throw new Error(
          `ChangeLog change is required and must be a string (Got ${change})`,
        );
      }
    });
  });

  return true;
};

const formatFrontMatter = (frontMatter: FrontMatter) => {
  const thumbnail =
    frontMatter.thumbnail || `/thumbnails/${frontMatter.category}-category.png`;

  return {
    ...frontMatter,
    thumbnail,
    date: new Date(frontMatter.date),
    publishedAt: new Date(frontMatter.publishedAt),
    changeLog: frontMatter.changeLog.map((entry) => ({
      ...entry,
      date: new Date(entry.date),
    })),
  };
};

export const getMdxDirectoryPath = () => {
  return path.join(process.cwd(), "src", "posts");
};

export const getMdxFiles = async () => {
  const mdxDirectoryPath = getMdxDirectoryPath();
  const entries = await fs.readdir(mdxDirectoryPath, {
    withFileTypes: true,
  });

  const mdxFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".mdx"),
  );

  return mdxFiles;
};

export const generateMdxSlugs = async () => {
  const mdxContents = await getMdxContents();

  return mdxContents.map((content) => ({
    slug: `${content.frontMatter.slug}`,
  }));
};

export const getMdxPathFromSlug = async (slug: string) => {
  const mdxFiles = await getMdxFiles();
  const mdxFile = mdxFiles.find((entry) => entry.name === `${slug}.mdx`);

  if (!mdxFile) {
    throw new Error(`No MDX file found for slug: ${slug}`);
  }

  return path.join(getMdxDirectoryPath(), mdxFile.name);
};

export const getMdxContentFromPath = async (mdxPath: string) => {
  const mdxContent = await fs.readFile(mdxPath, "utf-8");
  const {
    content: rawContent,
    data,
    excerpt: rawExcerpt,
  } = matter(mdxContent, {
    excerpt_separator: EXCERPT_SEPARATOR,
    excerpt: true,
  });

  try {
    validateFrontMatter(data);
  } catch (error) {
    throw new Error(
      `Invalid frontmatter in ${mdxPath}: ${(error as Error).message}`,
    );
  }

  const frontMatter = formatFrontMatter(data as FrontMatter);

  const content = rawContent.replace(rawExcerpt || "", "").trim();
  const excerpt = rawExcerpt
    ?.replace(EXCERPT_SEPARATOR, "")
    .replace(`${EXCERPT_SEPARATOR}\n\n`, "")
    .trim();

  return {
    frontMatter,
    excerpt,
    body: content,
  } as const;
};

export const getMdxContentFromSlug = async (mdxSlug: string) => {
  const mdxPath = await getMdxPathFromSlug(mdxSlug);
  return await getMdxContentFromPath(mdxPath);
};

interface GetMdxContentOptions {
  limit?: number;
  sortOrder?: "asc" | "desc";
  filter?: (_content: MdxContent) => boolean;
}

export const getMdxContents = async (options?: GetMdxContentOptions) => {
  const mdxFiles = await getMdxFiles();
  const mdxContents = await Promise.all(
    mdxFiles.map(async (entry) => {
      const mdxPath = path.join(getMdxDirectoryPath(), entry.name);
      return await getMdxContentFromPath(mdxPath);
    }),
  );

  if (options) {
    const { limit = -1, sortOrder = "desc", filter = (_) => true } = options;

    const sortedMdxContents = mdxContents.filter(filter).sort((a, b) => {
      const dateA = a.frontMatter.date.getTime();
      const dateB = b.frontMatter.date.getTime();

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return limit > 0 ? sortedMdxContents.slice(0, limit) : sortedMdxContents;
  }

  return mdxContents;
};

export const getMdxContentsInCache = unstable_cache(getMdxContents);

export const getMdxContentsWithFilter = async (
  numPosts: number = -1,
  sortOrder: SortOrder = "desc",
  filter: (_content: MdxContent) => boolean = () => true,
) => {
  const mdxContents = await getMdxContents();
  const sortedMdxContents = mdxContents.filter(filter).sort((a, b) => {
    const dateA = new Date(a.frontMatter.date).getTime();
    const dateB = new Date(b.frontMatter.date).getTime();

    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return numPosts > 0
    ? sortedMdxContents.slice(0, numPosts)
    : sortedMdxContents;
};

export const getLatestMdxContent = async (numPosts: number = 1) => {
  return await getMdxContentsWithFilter(numPosts);
};

export const getLatestMdxContentByTag = async (
  tag: string,
  numPosts: number = -1,
) => {
  return await getMdxContentsWithFilter(numPosts, "desc", (content) => {
    return content.frontMatter.tags.includes(tag);
  });
};

export const getAllCategories = async () => {
  const mdxContents = await getMdxContents();

  const categories = mdxContents.reduce(
    (acc, content) => {
      const category = content.frontMatter.category;

      if (!acc.has(category)) {
        acc.set(category, {
          url: `/categories/${category}`,
          postCount: 1,
        });
      } else {
        const categoryData = acc.get(category)!;

        acc.set(category, {
          url: categoryData.url,
          postCount: categoryData.postCount + 1,
        });
      }

      return acc;
    },
    new Map<
      string,
      {
        url: string;
        postCount: number;
      }
    >(),
  );

  return categories;
};

export const getAllTags = async () => {
  const mdxContents = await getMdxContentsWithFilter();

  const tags = mdxContents.reduce(
    (acc, content) => {
      content.frontMatter.tags.forEach((tag) => {
        if (!acc.has(tag)) {
          acc.set(tag, {
            url: `/tags/${tag}`,
            postCount: 1,
          });
        } else {
          const categoryData = acc.get(tag)!;

          acc.set(tag, {
            url: categoryData.url,
            postCount: categoryData.postCount + 1,
          });
        }
      });

      return acc;
    },
    new Map<
      string,
      {
        url: string;
        postCount: number;
      }
    >(),
  );

  return tags;
};
