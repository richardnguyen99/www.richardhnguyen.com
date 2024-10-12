import { type RehypeShikiCoreOptions } from "@shikijs/rehype/core";

interface MetaValue {
  name: string;
  regex: RegExp;
}

interface MetaMap {
  title: string;
  displayLineNumbers: boolean;
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
    regex: /line-numbers="(?<value>true|false)"/,
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
    };

    for (const value of metaValues) {
      const result = value.regex.exec(metaString);

      if (value.name === "title") {
        map.title = result?.groups?.value || "";
      }

      if (result && value.name === "displayLineNumbers") {
        map.displayLineNumbers = result.groups?.value === "true";
      }
    }

    return map;
  },
  transformers: [
    {
      pre(hast) {
        const optionMeta = this.options.meta as MetaMap;
        this.pre.properties["data-display-line-numbers"] = new Boolean(
          optionMeta.displayLineNumbers,
        ).toString();

        if (optionMeta.title && optionMeta.title.length > 0) {
          this.pre.properties["data-title"] = optionMeta.title;
        } else {
          this.pre.properties["data-title"] = "none";
        }

        delete this.pre.properties.title;
        delete this.pre.properties.displayLineNumbers;

        return hast;
      },
      span(node, line, col) {
        node.properties["data-token"] = `token:${line}:${col}`;
      },
    },
  ],
};

export default shikiRehypeOptions;
