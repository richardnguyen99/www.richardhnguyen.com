import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import remarkReferenceLinks from "remark-reference-links";
import remarkSmartyPants from "remark-smartypants";
import remarkGfm from "remark-gfm";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import mdxComponents from "./mdx-components";
import "./mdx.css";
import Frontmatter from "./frontmatter";
import BlogBreadcrumb from "./breadcrumb";
import { Separator } from "@/components/ui/separator";

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
    <div className="w-full text-left [--article-container-size:var(--container-size)] [--article-gutter-size:var(--gutter-size,_100%)] md:[--article-container-size:calc(theme(maxWidth.3xl)-theme(spacing.6))] md:[--article-gutter-size:auto]">
      <BlogBreadcrumb
        title={frontMatter.title}
        href={`https://github.com/richardnguyen99/next.richardhnguyen.com/edit/main/src/posts/${slug}.mdx`}
      />
      <Frontmatter data={frontMatter} excerpt={excerpt} />

      <Separator className="mx-auto my-12 w-[var(--article-container-size)] bg-neutral-300 px-[var(--article-gutter-size)] dark:bg-neutral-700" />

      <div className="content">
        <MDXRemote
          source={body}
          components={mdxComponents}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              rehypePlugins: [],
              remarkPlugins: [
                remarkGfm,
                remarkReferenceLinks,
                remarkSmartyPants,
              ],
              format: "mdx",
            },
          }}
        />
      </div>
    </div>
  );
}
