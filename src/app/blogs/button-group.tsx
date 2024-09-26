"use client";

import * as React from "react";

import FilterButton from "./filter-button";
import SortButton from "./sort-button";

interface ButtonGroupProps {
  tags: {
    values: string[];
    selectedIndices: number[];
  };
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ tags }) => {
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
      />
      <SortButton />
    </div>
  );
};

export default ButtonGroup;
