"use client";

import * as React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavbarContext } from "./context";

const NavigationSearchButton: React.FC = () => {
  const navbarContext = useNavbarContext();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group relative block",
            "h-10 w-10 rounded-full p-2",
            "hover:bg-neutral-100 dark:hover:bg-neutral-700",
            "ease-curve-d transition-opacity duration-300",
            {
              "opacity-0": navbarContext.isOpen,
              "opacity-100": !navbarContext.isOpen,
            },
          )}
          type="button"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-full w-full" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        Search
      </TooltipContent>
    </Tooltip>
  );
};

export default NavigationSearchButton;
