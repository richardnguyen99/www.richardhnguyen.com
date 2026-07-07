import type { CompileOptions } from "@mdx-js/mdx";
import remarkReferenceLinks from "remark-reference-links";
import remarkSmartyPants from "remark-smartypants";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const remarkPlugins: CompileOptions["remarkPlugins"] = [
  remarkGfm,
  remarkReferenceLinks,
  remarkSmartyPants,
  remarkMath,
];

export default remarkPlugins;
