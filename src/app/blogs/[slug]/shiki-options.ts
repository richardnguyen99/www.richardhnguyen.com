import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerRemoveNotationEscape,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { type RehypeShikiCoreOptions } from "@shikijs/rehype/core";

interface MetaValue {
  name: string;
  regex: RegExp;
}

export interface MetaMap {
  title: string;
  displayLineNumbers: boolean | undefined;
  allowCopy: boolean | undefined;
  lang: string | undefined;
  rawCode: string;
}

/**
 * Custom meta string values
 */
const metaValues: MetaValue[] = [
  {
    name: "title",
    regex: /title="(?<value>[^"]*)"/,
  },
  {
    name: "displayLineNumbers",
    regex: /displayLineNumbers="(?<value>true|false)"/,
  },
  {
    name: "allowCopy",
    regex: /allowCopy="(?<value>true|false)"/,
  },
];

const codeDiffPattern = /^\/\/ \[!code (\+\+|\-\-)\]$/;

const shikiRehypeOptions: RehypeShikiCoreOptions = {
  themes: {
    dark: "github-dark",
    light: "github-light",
  },
  cssVariablePrefix: "--shiki-",
  defaultColor: false,
  parseMetaString(metaString) {
    const map: MetaMap = {
      title: "",
      displayLineNumbers: undefined,
      allowCopy: undefined,
      lang: "txt",
      rawCode: "",
    };

    for (const value of metaValues) {
      const result = value.regex.exec(metaString);

      if (result && value.name === "title") {
        map.title = result?.groups?.value || "";
      }

      if (result && value.name === "displayLineNumbers") {
        map.displayLineNumbers = result.groups?.value === "true";
      }

      if (result && value.name === "allowCopy") {
        map.allowCopy = result.groups?.value === "true";
      }
    }

    return map;
  },
  transformers: [
    transformerNotationDiff(),
    transformerMetaHighlight(),
    transformerNotationHighlight(),
    transformerRemoveNotationEscape(),
    {
      preprocess(code, options) {
        const optionMeta = options.meta as MetaMap;

        optionMeta.rawCode = code.replace(
          /(\/\/ \[!code (\+\+|\-\-|highlight)\]|\u00AD)/g,
          "",
        );
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

        if (typeof optionMeta.allowCopy === "undefined") {
          optionMeta.allowCopy = true;
        }
      },

      span(node, line, col) {
        node.properties["data-token"] = `token:${line}:${col}`;
      },
    },
  ],
};

export default shikiRehypeOptions;
