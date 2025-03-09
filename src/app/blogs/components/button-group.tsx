"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const SortButton = dynamic(() => import("./sort-button"), {
  ssr: false,
  loading: () => (
    <div className="h-[40px] w-1/2 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700 md:w-[100px]" />
  ),
});

const FilterButton = dynamic(() => import("./filter-button"), {
  ssr: false,
  loading: () => (
    <div className="h-[40px] w-1/2 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700 md:w-[100px]" />
  ),
});

interface ButtonGroupProps {
  sortOrder?: "asc" | "desc";
  sortType?: "latest" | "alphabet";
  tags: {
    values: string[];
    selectedIndices: number[];
  };
  categories: {
    values: string[];
    selectedIndices: number[];
  };
}

export default function ButtonGroup({
  tags,
  categories,
  sortOrder,
  sortType,
}: ButtonGroupProps): JSX.Element {
  const [openingTag, setOpeningTag] = React.useState<string>("");

  return (
    <div className="flex items-center gap-4">
      <FilterButton
        opening={openingTag === "tag"}
        onOpenChange={(open) => {
          if (open) setOpeningTag("tag");
          else setOpeningTag("");
        }}
        filterTags={{
          tags: tags.values,
          indices: tags.selectedIndices,
        }}
        filterCategories={{
          categories: categories.values,
          indices: categories.selectedIndices,
        }}
      />
      <SortButton
        open={openingTag === "sort"}
        onOpenChange={(open) => {
          if (open) setOpeningTag("sort");
          else setOpeningTag("");
        }}
        initialSortOrder={sortOrder}
        initialSortType={sortType}
      />
    </div>
  );
}
