import React, { type JSX } from "react";
import type { Metadata } from "next";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import { ClientOnly } from "@/components/client-only";
import { sharedMetadata } from "@/lib/metadata";
import TableOfContent from "./components/table-of-content";
import MdxRemote from "./components/mdx-remote";

import "./mdx.css";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// NextJS options to disable dynamic routing at runtime
export const dynamicParams = false;

// NextJS options to enable to generate static paths at build time.
export async function generateStaticParams() {
  const slugs = await generateMdxSlugs();

  return slugs;
}

// NextJS options to generate metadata for page dynamically
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter, excerpt } = await getMdxContentFromSlug(slug);

  return {
    ...sharedMetadata,
    title: `${frontMatter.title}`,
    description: excerpt,
    keywords: frontMatter.tags,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `${frontMatter.title}`,
      description: excerpt,
      type: "article",
      url: process.env.NODE_ENV === "production" ? `/blogs/${slug}` : undefined,
      images: [
        {
          url: frontMatter.thumbnail,
          width: 1470,
          height: 980,
          alt: frontMatter.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      card: "summary_large_image",
      title: frontMatter.title,
      description: excerpt,
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
}

export default async function BlogPost({
  params,
}: BlogPostProps): Promise<JSX.Element> {
  const { slug } = await params;

  return (
    <div className="w-full text-left [--article-container-size:var(--container-size)] [--article-gutter-size:var(--gutter-size,_100%)] md:[--article-container-size:calc(theme(maxWidth.3xl)-theme(spacing.6))] md:[--article-gutter-size:auto]">
      <ClientOnly>
        <TableOfContent />
      </ClientOnly>

      <MdxRemote slug={slug} />
    </div>
  );
}
