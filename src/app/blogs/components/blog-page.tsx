import React, { type JSX } from "react";
import dynamic from "next/dynamic";

import { getAllCategories, getAllTags, getMdxContents } from "@/lib/mdx";
import BlogGrid from ".//blog-grid";
import BlogPagination from "./pagination";

const ButtonGroup = dynamic(() => import("./button-group"), {
  loading: () => (
    <div className="flex items-center gap-4">
      <div className="h-[40px] w-1/2 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700 md:w-[100px]" />
      <div className="h-[40px] w-1/2 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700 md:w-[100px]" />
    </div>
  ),
});

interface BlogProps {
  searchParams: {
    sortOrder: "asc" | "desc";
    sortType: "latest" | "alphabet";
    tags: string[];
    categories: string[];
    page: number;
  };
}

export default async function BlogPage(props: BlogProps): Promise<JSX.Element> {
  const {
    sortOrder: selectedSortOrder,
    sortType: selectedSortType,
    tags: selectedTags = [],
    categories: selectedCategories = [],
    page: currentPage = 1,
  } = props.searchParams;
  const tags = Array.from((await getAllTags()).entries()).map(([key]) => key);
  const categories = Array.from((await getAllCategories()).entries()).map(
    ([key]) => key,
  );

  const selectedTagIndices = selectedTags.map((tag) => tags.indexOf(tag));
  const selectedCategoryIndices = selectedCategories.map((category) =>
    categories.indexOf(category),
  );

  const posts = await getMdxContents({
    filter: (post) => {
      // Filter by categories first

      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(post.frontMatter.category)) {
          return false;
        }
      }

      // Filter by tags
      if (selectedTags.length > 0) {
        if (!post.frontMatter.tags.some((tag) => selectedTags.includes(tag))) {
          return false;
        }
      }

      return true;
    },
    sortOrder: selectedSortOrder,
    sortType: selectedSortType,
  });

  return (
    <React.Fragment>
      <div className="mx-[var(--gutter-size)] flex justify-between gap-4 sm:w-[var(--container-size)]">
        <div className="flex w-full flex-col">
          <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {posts.length} articles
          </h2>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
            <h3 className="mt-2 text-pretty text-6xl font-medium tracking-tighter text-neutral-950 dark:text-white sm:text-4xl md:text-2xl">
              Latest Blog
            </h3>

            <ButtonGroup
              sortOrder={selectedSortOrder}
              sortType={selectedSortType}
              tags={{
                values: tags,
                selectedIndices: selectedTagIndices,
              }}
              categories={{
                values: categories,
                selectedIndices: selectedCategoryIndices,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
        <React.Suspense fallback={<div>Loading...</div>}>
          <BlogGrid posts={posts} currentPage={currentPage} />
        </React.Suspense>

        <BlogPagination
          posts={Array.from({ length: 1 })
            .map((_) => [...posts])
            .flat()}
        />
      </div>
    </React.Fragment>
  );
}
