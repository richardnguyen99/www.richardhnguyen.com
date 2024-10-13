import { type RehypeShikiCoreOptions } from "@shikijs/rehype/core";

interface MetaValue {
  name: string;
  regex: RegExp;
}

interface MetaMap {
  title: string;
  displayLineNumbers: boolean;
  allowCopy: boolean;
  [key: string]: string | boolean;
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

const shikiRehypeOptions: RehypeShikiCoreOptions = {
  themes: {
    dark: "github-dark",
    light: "github-light",
  },
  parseMetaString(metaString) {
    const map: MetaMap = {
      title: "",
      displayLineNumbers: true,
      allowCopy: true,
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
    {
      preprocess(code, options) {
        const optionMeta = options.meta as MetaMap;

        if (!optionMeta.title || optionMeta.title.length <= 0) {
          optionMeta.title = "none";
        }

        if (!optionMeta.displayLineNumbers) {
          // Disable line numbers for shell scripts
          if (this.options.lang === "sh") {
            optionMeta.displayLineNumbers = false;
          } else {
            optionMeta.displayLineNumbers = true;
          }
        }

        if (!optionMeta.allowCopy) {
          optionMeta.allowCopy = true;
        }
      },
      pre(hast) {
        const optionMeta = this.options.meta as MetaMap;
        this.pre.properties["data-display-line-numbers"] = new Boolean(
          optionMeta.displayLineNumbers,
        ).toString();

        this.pre.properties["data-title"] = optionMeta.title;
        this.pre.properties["data-allow-copy"] = new Boolean(
          optionMeta.allowCopy,
        ).toString();

        // Remove old properties
        delete this.pre.properties.title;
        delete this.pre.properties.displayLineNumbers;
        delete this.pre.properties.allowCopy;

        return hast;
      },
      span(node, line, col) {
        node.properties["data-token"] = `token:${line}:${col}`;
      },
    },
  ],
};

export default shikiRehypeOptions;
