import React, { type JSX } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getMdxContentFromSlug } from "@/lib/mdx";
import { Separator } from "@/components/ui/separator";
import mdxComponents from "./mdx-components";
import BlogBreadcrumb from "./breadcrumb";
import Frontmatter from "./frontmatter";
import Tags from "./tags";
import rehypePlugins from "../lib/shiki-rehype-plugins";
import remarkPlugins from "../lib/shiki-remark-pluugins";

type Props = {
  slug: string;
};

export default async function MdxRemote({ slug }: Props): Promise<JSX.Element> {
  const { frontMatter, body, excerpt } = await getMdxContentFromSlug(slug);

  return (
    <React.Fragment>
      <BlogBreadcrumb
        title={frontMatter.title}
        href={`https://github.com/richardnguyen99/www.richardhnguyen.com/edit/main/src/posts/${slug}.mdx`}
      />

      <Frontmatter data={frontMatter} excerpt={excerpt} />

      <Separator className="mx-auto my-12 w-[var(--article-container-size)] bg-neutral-300 px-[var(--article-gutter-size)] dark:bg-neutral-700" />

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
