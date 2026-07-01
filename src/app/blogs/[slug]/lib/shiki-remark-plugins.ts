import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkReferenceLinks from "remark-reference-links";
import remarkSmartyPants from "remark-smartypants";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const remarkPlugins = [
  remarkGfm,
  remarkReferenceLinks,
  remarkSmartyPants,
  remarkMath,
] satisfies NonNullable<
  NonNullable<MDXRemoteProps["options"]>["mdxOptions"]
>["remarkPlugins"];

export default remarkPlugins;
