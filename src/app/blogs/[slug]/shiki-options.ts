import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { type RehypeShikiCoreOptions } from "@shikijs/rehype/core";

export interface MetaMap {
  title: string;
  displayLineNumbers: boolean | undefined;
  disableCopyButton: boolean | undefined;
  lang: string | undefined;
}

const shikiRehypeOptions: RehypeShikiCoreOptions = {
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
};

export default shikiRehypeOptions;
