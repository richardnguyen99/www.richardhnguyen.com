import * as React from "react";
import dynamic from "next/dynamic";

import { getAllCategories, getAllTags, getMdxContents } from "@/lib/mdx";
import BlogGrid from "./blog-grid";

const ButtonGroup = dynamic(() => import("./button-group"), { ssr: false });

interface BlogProps {
  searchParams?: {
    sortOrder?: "asc" | "desc";
    sortType?: "latest" | "alphabet";
    tags?: string;
    categories?: string;
    page?: number;
  };
}

const Blog: React.FC<BlogProps> = async (props) => {
  const tags = Array.from((await getAllTags()).entries()).map(([key]) => key);

  const categories = Array.from((await getAllCategories()).entries()).map(
    ([key]) => key,
  );

  const selectedSortType = props.searchParams?.sortType;

  const selectedSortOrder = props.searchParams?.sortOrder;

  const selectedTags = props.searchParams?.tags?.split(",") || [];

  const selectedCategories = props.searchParams?.categories?.split(",") || [];

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
          <BlogGrid posts={posts} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Blog;
