import * as path from "node:path";
import * as fs from "node:fs/promises";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";
import { MdxContent, FrontMatter, SortOrder } from "@/types/mdx";

const EXCERPT_SEPARATOR = "{/* EXCERPT */}";

const validateFrontMatter = (
  frontmatter: unknown,
): frontmatter is FrontMatter => {
  if (typeof frontmatter !== "object" || frontmatter === null) {
    throw new Error(`Frontmatter must be an object (Got ${frontmatter})`);
  }

  const fm = frontmatter as Record<string, unknown>;

  if (!fm.title || typeof fm.title !== "string") {
    throw new Error(`Title is required and must be a string (Got ${fm.title})`);
  }

  if (!fm.date || typeof fm.date !== "string" || !(Date.parse(fm.date) > 0)) {
    throw new Error(
      `Date is required and must be a valid date string (Got ${fm.date})`,
    );
  }

  if (typeof fm.published !== "boolean") {
    throw new Error(
      `Published is required and must be a boolean (Got ${fm.published})`,
    );
  }

  if (
    !fm.publishedAt ||
    typeof fm.publishedAt !== "string" ||
    !(Date.parse(fm.publishedAt) > 0)
  ) {
    throw new Error(
      `PublishedAt is required and must be a valid date string (Got ${fm.publishedAt})`,
    );
  }

  if (!fm.author || typeof fm.author !== "string") {
    throw new Error(
      `Author is required and must be a string (Got ${fm.author})`,
    );
  }

  if (!fm.tags || !Array.isArray(fm.tags)) {
    throw new Error(`Tags is required and must be an array (Got ${fm.tags})`);
  }

  if (!fm.category || typeof fm.category !== "string") {
    throw new Error(
      `Category is required and must be a string (Got ${fm.category})`,
    );
  }

  if (!fm.changeLog || !Array.isArray(fm.changeLog)) {
    throw new Error(
      `ChangeLog is required and must be an array (Got ${fm.changeLog})`,
    );
  }

  fm.changeLog.forEach((entry: unknown) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error(`ChangeLog entry must be an object (Got ${entry})`);
    }

    const { date, changes } = entry as Record<string, unknown>;

    if (!date || typeof date !== "string" || !(Date.parse(date) > 0)) {
      throw new Error(
        `ChangeLog date is required and must be a valid date string (Got ${date})`,
      );
    }

    if (!changes || !Array.isArray(changes)) {
      throw new Error(
        `ChangeLog change is required and must be an array (Got ${changes})`,
      );
    }

    changes.forEach((change: unknown) => {
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
  "use cache";

  const mdxDirectoryPath = getMdxDirectoryPath();
  const entries = await fs.readdir(mdxDirectoryPath, {
    withFileTypes: true,
  });

  const mdxFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".mdx"),
  );

  const mdxFilePaths = mdxFiles.map((entry) => ({
    name: entry.name,
  }));

  return mdxFilePaths;
};

export const generateMdxSlugs = async () => {
  const mdxContents = await getMdxContents({
    filter: (content) =>
      process.env.NODE_ENV === "development" ||
      (process.env.NODE_ENV === "production" && content.frontMatter.published),
  });

  return mdxContents.map((content) => ({
    slug: `${content.frontMatter.slug}`,
  }));
};

export const getMdxPathFromSlug = async (slug: string) => {
  const mdxFiles = await getMdxFiles();
  const mdxFile = mdxFiles.find((entry) => entry.name === `${slug}.mdx`);

  if (!mdxFile) {
    return undefined;
  }

  return path.join(getMdxDirectoryPath(), mdxFile.name);
};

export const getMdxContentFromPath = async (mdxPath: string) => {
  "use cache";

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
  if (!mdxPath) {
    return null;
  }
  return await getMdxContentFromPath(mdxPath);
};

interface GetMdxContentOptions {
  limit?: number;
  sortOrder?: "asc" | "desc";
  sortType?: "latest" | "alphabet";
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
    const {
      limit = -1,
      sortOrder = "desc",
      sortType = "latest",
      filter = (_) => true,
    } = options;

    const sortedMdxContents = mdxContents.filter(filter).sort((a, b) => {
      if (sortType === "alphabet") {
        return sortOrder === "desc"
          ? a.frontMatter.title.localeCompare(b.frontMatter.title)
          : b.frontMatter.title.localeCompare(a.frontMatter.title);
      }

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
  // Uncomment the following line to simulate a slow network
  // const r = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  // await new Promise((resolve) => setTimeout(resolve, 5 * 1000));

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
  const mdxContents = await getMdxContents({
    filter: (content) =>
      process.env.NODE_ENV === "development" || content.frontMatter.published,
  });

  const categories = mdxContents.reduce(
    (acc, content) => {
      const category = content.frontMatter.category;

      if (!acc.has(category)) {
        acc.set(category, {
          url: `/blogs?categories=${category}`,
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
  const mdxContents = await getMdxContents({
    filter: (content) =>
      process.env.NODE_ENV === "development" || content.frontMatter.published,
  });

  const tags = mdxContents.reduce(
    (acc, content) => {
      content.frontMatter.tags.forEach((tag) => {
        if (!acc.has(tag)) {
          acc.set(tag, {
            url: `/blogs?tags=${tag}`,
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
