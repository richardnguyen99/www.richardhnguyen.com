import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import mdxComponents from "./mdx-components";
import "./mdx.css";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// NextJS options to disable dynamic routing at runtime
// export const dynamicParams = false;

// NextJS options to enable to generate static paths at build time.
export const generateStaticParams = async () => {
  return await generateMdxSlugs();
};

export default async function BlogPost({ params: { slug } }: BlogPostProps) {
  const {
    frontMatter: _frontMatter,
    body,
    excerpt: _excerpt,
  } = await getMdxContentFromSlug(slug);

  return (
    <div className="prose w-full text-left lg:prose-xl md:max-w-2xl">
      <MDXRemote source={body} components={mdxComponents} />
    </div>
  );
}
