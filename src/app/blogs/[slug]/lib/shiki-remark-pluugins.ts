import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkReferenceLinks from "remark-reference-links";
import remarkSmartyPants from "remark-smartypants";
import remarkGfm from "remark-gfm";

const remarkPlugins = [
  remarkGfm,
  remarkReferenceLinks,
  remarkSmartyPants,
] satisfies NonNullable<
  NonNullable<MDXRemoteProps["options"]>["mdxOptions"]
>["remarkPlugins"];

export default remarkPlugins;
