"use client";

import * as React from "react";

import FilterButton from "./filter-button";
import SortButton from "./sort-button";

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

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  tags,
  categories,
  sortOrder,
  sortType,
}) => {
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
};

export default ButtonGroup;
