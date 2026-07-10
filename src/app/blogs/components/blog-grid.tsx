import React, { type JSX } from "react";

import { type MdxContent } from "@/types/mdx";
import { NUM_POST_PER_PAGE } from "../lib/constant";
import BlogCard from "./blog-card";
import BlogCardEmpty from "./blog-card-empty";

interface BlogGridProps {
  posts: MdxContent[];
  currentPage: number;
}

export default function BlogGrid({
  posts,
  currentPage,
}: BlogGridProps): JSX.Element {
  const pageStart = (currentPage - 1) * NUM_POST_PER_PAGE;
  const pageEnd = currentPage * NUM_POST_PER_PAGE;

  const postsToShow = posts.slice(pageStart, pageEnd);

  return (
    <ul className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {postsToShow.length > 0 ? (
        postsToShow.map((post, i) => <BlogCard key={i} post={post} />)
      ) : (
        <BlogCardEmpty />
      )}
    </ul>
  );
}
