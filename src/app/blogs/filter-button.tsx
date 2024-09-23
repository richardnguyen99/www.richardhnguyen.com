"use client";

import * as React from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  initialFilter?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      className="ease-curve-d group flex transform-gpu items-center gap-3 rounded-full bg-gray-100/0 text-gray-950 shadow-none duration-200 hover:bg-gray-100"
    >
      <span>Filter</span>
      <MixerHorizontalIcon className="h-4 w-4" />
    </Button>
  );
};

export default FilterButton;
