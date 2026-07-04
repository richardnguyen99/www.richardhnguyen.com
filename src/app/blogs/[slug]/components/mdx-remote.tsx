import React, { type JSX } from "react";

import { Separator } from "@/components/ui/separator";
import BlogBreadcrumb from "./breadcrumb";
import Frontmatter from "./frontmatter";
import Tags from "./tags";
import { FrontMatter } from "@/types/mdx";
import MdxRemoteClient from "./mdx-remote-client";

type Props = {
  slug: string;
  frontMatter: FrontMatter;
  excerpt: string | undefined;
  body: string;
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
        <MdxRemoteClient body={body} />
      </div>

      <Tags tags={frontMatter.tags} />
    </React.Fragment>
  );
}
