import React, { type JSX } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Separator } from "@/components/ui/separator";
import mdxComponents from "./mdx-components";
import BlogBreadcrumb from "./breadcrumb";
import Frontmatter from "./frontmatter";
import Tags from "./tags";
import rehypePlugins from "../lib/shiki-rehype-plugins";
import remarkPlugins from "../lib/shiki-remark-plugins";
import { FrontMatter } from "@/types/mdx";

type Props = {
  slug: string;
  frontMatter: FrontMatter;
  body: string;
  excerpt: string | undefined;
};

export default async function MdxRemote({
  slug,
  frontMatter,
  body,
  excerpt,
}: Props): Promise<JSX.Element> {
  return (
    <React.Fragment>
      <BlogBreadcrumb
        title={frontMatter.title}
        href={`https://github.com/richardnguyen99/www.richardhnguyen.com/edit/main/src/posts/${slug}.mdx`}
      />

      <Frontmatter data={frontMatter} excerpt={excerpt} />

      <Separator className="mx-auto my-12 w-(--article-container-size) bg-neutral-300 px-(--article-gutter-size) dark:bg-neutral-700" />

      <div className="content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <MDXRemote
            source={body}
            components={mdxComponents}
            options={{
              scope: {},
              mdxOptions: {
                useDynamicImport: true,
                rehypePlugins,
                remarkPlugins,
                format: "mdx",
              },
            }}
          />
        </React.Suspense>
      </div>

      <Tags tags={frontMatter.tags} />
    </React.Fragment>
  );
}
