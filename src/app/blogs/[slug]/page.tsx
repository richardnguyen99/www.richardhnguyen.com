import React, { type JSX } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import { ClientOnly } from "@/components/client-only";
import { sharedMetadata } from "@/lib/metadata";
import MdxRemote from "./components/mdx-remote";

import "./mdx.css";

const TableOfContent = dynamic(
  () => import("./components/table-of-content"),
  {},
);

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// NextJS options to disable dynamic routing at runtime
export const dynamicParams = false;

// NextJS options to enable to generate static paths at build time.
export const generateStaticParams = async () => {
  return await generateMdxSlugs();
};

// NextJS options to generate metadata for page dynamically
export const generateMetadata = async ({
  params,
}: BlogPostProps): Promise<Metadata> => {
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
};

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
