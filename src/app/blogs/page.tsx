import * as React from "react";

import { getMdxContents } from "@/lib/mdx";
import BlogGrid from "./blog-grid";
import FilterButton from "./filter-button";
import SortButton from "./sort-button";

interface BlogProps {
  searchParams?: {
    sortOrder?: "asc" | "desc";
    sortType?: "date" | "most-viewed";
    filter?: string;
    page?: number;
  };
}

const Blog: React.FC<BlogProps> = async () => {
  const posts = await getMdxContents();

  return (
    <div className="mt-8 w-screen max-w-full sm:mt-12 md:mt-20 lg:mt-28">
      <div className="mx-[var(--gutter-size)] flex justify-between gap-4 sm:w-[var(--container-size)]">
        <div className="flex w-full flex-col">
          <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
            {posts.length} articles
          </h2>
          <div className="flex w-full items-center justify-between">
            <h3 className="mt-2 text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-2xl">
              Latest Blog
            </h3>
            <div className="flex items-center gap-4">
              <FilterButton />
              <SortButton />
            </div>
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
