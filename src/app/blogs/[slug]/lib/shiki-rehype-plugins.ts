import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex, { type Options as RehypeKatexOptions } from "rehype-katex";
import { getSingletonHighlighter } from "shiki";
import type { CompileOptions } from "@mdx-js/mdx";
import type { Element } from "hast";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

import shikiRehypeOptions from "./shiki-options";

// Plain HAST literal instead of fromHtmlIsomorphic().children.
// fromHtmlIsomorphic() returns objects whose internal shape webpack's
// persistent cache serializer cannot round-trip. Writing the node
// directly as a literal produces an identical value that is provably
// a plain object.
const anchorLinkContent: Element[] = [
  {
    type: "element",
    tagName: "span",
    properties: { className: ["icon", "icon-link"] },
    children: [{ type: "text", value: "#" }],
  },
];

const rehypePlugins = [
  [
    rehypePrettyCode,
    {
      defaultLang: "txt",
      theme: {
        dark: "github-dark-high-contrast",
        light: "github-light",
      },
      filterMetaString: (string: string) =>
        string.replace(/disableCopyButton="[^"]*"/, ""),
      transformers: shikiRehypeOptions.transformers,
      getHighlighter: async (options) => {
        return getSingletonHighlighter({
          ...options,
          langs: [...options.langs, "makefile", "cmake"],
        });
      },
    } satisfies RehypePrettyCodeOptions,
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
      content: anchorLinkContent,
      properties: {
        className: "anchor",
      },
    },
  ],
] satisfies CompileOptions["rehypePlugins"];

export default rehypePlugins;
