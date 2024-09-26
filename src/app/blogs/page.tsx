import * as React from "react";
import dynamic from "next/dynamic";

import { getAllTags, getMdxContents } from "@/lib/mdx";
import BlogGrid from "./blog-grid";

const ButtonGroup = dynamic(() => import("./button-group"), { ssr: false });

interface BlogProps {
  searchParams?: {
    sortOrder?: "asc" | "desc";
    sortType?: "date" | "most-viewed";
    tags?: string;
    categories?: string;
    page?: number;
  };
}

const Blog: React.FC<BlogProps> = async (props) => {
  const tags = Array.from((await getAllTags()).entries()).map(([key]) => key);

  const selectedTags = props.searchParams?.tags?.split(",") || [];

  const selectedTagIndices = selectedTags.map((tag) => tags.indexOf(tag));

  const posts = await getMdxContents({
    filter: (post) => {
      return (
        !props.searchParams?.tags ||
        post.frontMatter.tags.some((tag) => selectedTags.includes(tag))
      );
    },
  });

  return (
    <div className="mt-8 w-screen max-w-full sm:mt-12 md:mt-20 lg:mt-28">
      <div className="mx-[var(--gutter-size)] flex justify-between gap-4 sm:w-[var(--container-size)]">
        <div className="flex w-full flex-col">
          <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
            {posts.length} articles
          </h2>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
            <h3 className="mt-2 text-pretty text-6xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-4xl md:text-2xl">
              Latest Blog
            </h3>

            <ButtonGroup
              tags={{
                values: tags,
                selectedIndices: selectedTagIndices,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
        <React.Suspense fallback={<div>Loading...</div>}>
          <BlogGrid posts={posts} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Blog;
