import React, { type JSX } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import { sharedMetadata } from "@/lib/metadata";
import { ClientOnly } from "@/components/client-only";
import TableOfContent from "./components/table-of-content";
import MdxRemote from "./components/mdx-remote";

import "./mdx.css";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

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
  const mdxData = await getMdxContentFromSlug(slug);

  if (!mdxData) {
    return {
      ...sharedMetadata,
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const { frontMatter, excerpt } = mdxData;

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
  // let frontMatter, body, excerpt;
  // try {
  //   const mdxData = await getMdxContentFromSlug(slug);

  //   frontMatter = mdxData.frontMatter;
  //   body = mdxData.body;
  //   excerpt = mdxData.excerpt;
  // } catch {
  //   notFound();
  // }

  let frontmatter, excerpt, body;

  // Because cache components are opted in, calling notFound() explicitly will
  // trigger 404 when the MDX file is not found, i.e when the slug is invalid.
  // This used to be done with `dynamicParams = false` but `dynamicParams` does
  // not work with cache components.

  try {
    const mdxData = await getMdxContentFromSlug(slug);

    if (!mdxData) {
      notFound();
    }

    frontmatter = mdxData.frontMatter;
    excerpt = mdxData.excerpt;
    body = mdxData.body;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <div className="w-full text-left [--article-container-size:var(--container-size)] [--article-gutter-size:var(--gutter-size,100%)] md:[--article-container-size:calc(var(--container-3xl)-(--spacing(6)))] md:[--article-gutter-size:auto]">
      <ClientOnly>
        <TableOfContent />
      </ClientOnly>

      <MdxRemote
        slug={slug}
        frontMatter={frontmatter}
        excerpt={excerpt}
        body={body}
      ></MdxRemote>
    </div>
  );
}
