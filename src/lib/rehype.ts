import type { CompileOptions } from "@mdx-js/mdx";
import type { RehypeShikiCoreOptions } from "@shikijs/rehype/core";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import type { Options as RehypeKatexOptions } from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import { getSingletonHighlighter } from "shiki";

import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";

export interface MetaMap {
  title: string;
  displayLineNumbers: boolean | undefined;
  disableCopyButton: boolean | undefined;
  lang: string | undefined;
}

const shikiRehypeOptions = {
  themes: {
    dark: "github-dark",
    light: "github-light",
  },

  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    {
      preprocess(code, options) {
        const optionMeta = options.meta as MetaMap;

        if (options.lang === "mermaid" && options.meta) {
          options.meta.__raw = code;
          return;
        }

        optionMeta.disableCopyButton =
          options.meta?.__raw?.includes("disableCopyButton");

        optionMeta.lang = options.lang;

        if (!optionMeta.title || optionMeta.title.length <= 0) {
          optionMeta.title = "none";
        }

        if (typeof optionMeta.displayLineNumbers === "undefined") {
          // Disable line numbers for shell scripts
          if (this.options.lang === "sh") {
            optionMeta.displayLineNumbers = false;
          } else {
            optionMeta.displayLineNumbers = true;
          }
        }
      },

      span(node, line, col) {
        node.properties["data-token"] = `token:${line}:${col}`;
      },

      pre(hast) {
        if (this.options.lang === "mermaid") {
          hast.children = [
            {
              type: "element",
              tagName: "div",
              properties: {
                className: "mermaid",
              },
              children: [
                {
                  type: "text",
                  value: this.options.meta?.__raw || "",
                },
              ],
            },
          ];
        }
      },
    },
  ],
} satisfies RehypeShikiCoreOptions;

// Plain HAST literal instead of fromHtmlIsomorphic().children.
// fromHtmlIsomorphic() returns objects whose internal shape webpack's
// persistent cache serializer cannot round-trip. Writing the node
// directly as a literal produces an identical value that is provably
// a plain object.
/** @type {import('hast').Element[]} */
const anchorLinkContent = [
  {
    type: "element",
    tagName: "span",
    properties: { className: ["icon", "icon-link"] },
    children: [{ type: "text", value: "#" }],
  },
];

/**
 * @type {import('rehype-pretty-code').Options}
 */
const rehypePrettyCodeOptions = {
  defaultLang: "txt",
  theme: {
    dark: "github-dark-high-contrast",
    light: "github-light",
  },
  filterMetaString: (string) => string.replace(/disableCopyButton="[^"]*"/, ""),
  transformers: shikiRehypeOptions.transformers,
  getHighlighter: async (options) => {
    return getSingletonHighlighter({
      ...options,
      langs: [...options.langs, "makefile", "cmake"],
    });
  },
} satisfies RehypePrettyCodeOptions;

/** @type {import('rehype-katex').Options} */
const rehypeKatexOptions = {
  strict: true,
} satisfies RehypeKatexOptions;

const rehypePlugins = [
  [rehypePrettyCode, rehypePrettyCodeOptions],
  [rehypeKatex, rehypeKatexOptions],
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
