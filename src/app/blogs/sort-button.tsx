"use client";

import * as React from "react";
import { LineHeightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface SortButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  initialSortType?: string;
  initialSortOrder?: "asc" | "desc";
}

const SortButton: React.FC<SortButtonProps> = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      className="ease-curve-d group flex transform-gpu items-center gap-3 rounded-full bg-gray-100/0 text-gray-950 shadow-none duration-200 hover:bg-gray-100"
    >
      <span>Sort</span>
      <LineHeightIcon className="h-4 w-4" />
    </Button>
  );
};

export default SortButton;
