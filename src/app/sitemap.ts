import type { MetadataRoute } from "next";

import { getMdxContents } from "@/lib/mdx";

export const baseUrl = "https://next.richardhnguyen.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: MetadataRoute.Sitemap = (await getMdxContents()).map(
    (post, _index) => ({
      url: `${baseUrl}/blogs/${post.frontMatter.slug}`,
      lastModified: post.frontMatter.changeLog.slice(-1)[0].date,
      changeFrequency: "yearly",
      priority: 0.8,
    }),
  );

  return [
    ...posts,
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
