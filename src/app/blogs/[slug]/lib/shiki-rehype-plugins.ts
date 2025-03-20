import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex, { type Options as RehypeKatexOptions } from "rehype-katex";
import { getSingletonHighlighter } from "shiki";

import shikiRehypeOptions from "./shiki-options";

const rehypePlugins = [
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
      getHighlighter: async (options) => {
        return getSingletonHighlighter({
          ...options,
          langs: [...options.langs, "makefile", "cmake"],
        });
      },
    } as Parameters<typeof rehypePrettyCode>[0],
  ],

  [
    rehypeKatex,
    {
      strict: true,
    } satisfies RehypeKatexOptions,
  ],

  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      content: fromHtmlIsomorphic('<span className="icon icon-link">#</span>', {
        fragment: true,
      }).children,
      properties: {
        className: "anchor",
      },
    } as unknown as Parameters<typeof rehypeAutolinkHeadings>[0],
  ],
] satisfies NonNullable<
  NonNullable<MDXRemoteProps["options"]>["mdxOptions"]
>["rehypePlugins"];

export default rehypePlugins;
