import React, { type JSX } from "react";
import { type Metadata } from "next";

import { sharedMetadata } from "@/lib/metadata";
import BlogPage from "./components/blog-page";
import BlogGridSkeleton from "./components/blog-grid-skeleton";

interface BlogProps {
  searchParams?: Promise<{
    sortOrder?: "asc" | "desc";
    sortType?: "latest" | "alphabet";
    tags?: string;
    categories?: string;
    page?: number;
  }>;
}

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Blogs",
  description: "Blog section of Richard H. Nguyen Site",
  openGraph: {
    ...sharedMetadata.openGraph,
    title: "Blogs",
    description: "Blog section of Richard H. Nguyen Site",
    url: process.env.NODE_ENV === "production" ? "/blogs" : undefined,
    type: "website",
    images: [
      {
        url: "/blogs.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Blogs 's OG Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    title: "Blogs",
    description: "Blog section of Richard H. Nguyen Site",
    images: [
      {
        url: "/blogs.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Blogs 's Twitter Card",
        type: "image/png",
      },
    ],
  },
};

export default async function Blog(props: BlogProps): Promise<JSX.Element> {
  const searchParams = await props.searchParams;

  const selectedSortType = searchParams?.sortType;
  const selectedSortOrder = searchParams?.sortOrder;
  const selectedTags = searchParams?.tags?.split(",") || [];
  const selectedCategories = searchParams?.categories?.split(",") || [];
  const currentPage = searchParams?.page || 1;

  return (
    <React.Suspense fallback={<BlogGridSkeleton />}>
      <BlogPage
        searchParams={{
          sortOrder: selectedSortOrder || "desc",
          sortType: selectedSortType || "latest",
          tags: selectedTags,
          categories: selectedCategories,
          page: currentPage,
        }}
      />
    </React.Suspense>
  );
}
