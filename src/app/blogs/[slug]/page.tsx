import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import mdxComponents from "./mdx-components";
import "./mdx.css";
import Frontmatter from "./frontmatter";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// NextJS options to disable dynamic routing at runtime
export const dynamicParams = false;

// NextJS options to enable to generate static paths at build time.
export const generateStaticParams = async () => {
  return await generateMdxSlugs();
};

// NextJS options to generate metadata for page dynamically
export const generateMetadata = async ({
  params: { slug },
}: BlogPostProps): Promise<Metadata> => {
  const { frontMatter, excerpt } = await getMdxContentFromSlug(slug);

  return {
    title: frontMatter.title,
    description: excerpt,
    keywords: frontMatter.tags,
    openGraph: {
      title: frontMatter.title,
      description: excerpt,
      type: "article",
      images: [
        {
          url: frontMatter.thumbnail,
          width: 1470,
          height: 980,
          alt: frontMatter.title,
        },
      ],
    },
  };
};

export default async function BlogPost({ params: { slug } }: BlogPostProps) {
  const { frontMatter, body, excerpt } = await getMdxContentFromSlug(slug);

  return (
    <div className="mt-24 w-full text-left [--article-container-size:100%] [--article-gutter-size:var(--gutter-size)] sm:[--article-container-size:calc(theme(maxWidth.2xl)-theme(spacing.6))] sm:[--article-gutter-size:auto]">
      <Frontmatter data={frontMatter} excerpt={excerpt} />
      <MDXRemote source={body} components={mdxComponents} />
    </div>
  );
}
