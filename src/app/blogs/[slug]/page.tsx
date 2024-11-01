import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import remarkReferenceLinks from "remark-reference-links";
import remarkSmartyPants from "remark-smartypants";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getSingletonHighlighter } from "shiki";
import remarkEmbedder, { RemarkEmbedderOptions } from "@remark-embedder/core";
import remarkHtml from "remark-html";

import { generateMdxSlugs, getMdxContentFromSlug } from "@/lib/mdx";
import { Separator } from "@/components/ui/separator";
import mdxComponents from "./mdx-components";
import "./mdx.css";
import Frontmatter from "./frontmatter";
import BlogBreadcrumb from "./breadcrumb";
import Tags from "./tags";
import shikiRehypeOptions from "./shiki-options";
import Component from "./components/css-comparison-chart";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const StackBlitzTransformer = {
  name: "StackBlitz",
  // shouldTransform can also be async
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url);

    return (
      ["stackblitz.com", "www.stackblitz.com"].includes(host) &&
      pathname.includes("/s/")
    );
  },
  // getHTML can also be async
  getHTML(url: string) {
    const iframeUrl = url.replace("/s/", "/embed/");

    return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

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
            scope: {},
            mdxOptions: {
              useDynamicImport: true,
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    defaultLang: "txt",
                    theme: {
                      dark: "github-dark-high-contrast",
                      light: "github-light",
                    },
                    filterMetaString: (string) =>
                      string.replace(/disableCopyButton="[^"]*"/, ""),
                    transformers: shikiRehypeOptions.transformers,
                    getHighlighter: (options) => {
                      return getSingletonHighlighter({
                        ...options,
                      });
                    },
                  } as Parameters<typeof rehypePrettyCode>[0],
                ],
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "append",
                    content: fromHtmlIsomorphic(
                      '<span className="icon icon-link">#</span>',
                      { fragment: true },
                    ).children,
                    properties: {
                      className: "anchor",
                    },
                  } as unknown as Parameters<typeof rehypeAutolinkHeadings>[0],
                ],
              ],
              remarkPlugins: [
                [
                  remarkEmbedder,
                  {
                    transformers: [
                      StackBlitzTransformer,
                    ] satisfies RemarkEmbedderOptions["transformers"],
                  },
                ],
                remarkHtml,
                remarkGfm,
                remarkReferenceLinks,
                remarkSmartyPants,
              ],
              format: "mdx",
            },
          }}
        />
      </div>
      <Tags tags={frontMatter.tags} />
    </div>
  );
}
