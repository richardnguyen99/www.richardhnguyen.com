"use client";

import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavbarContext } from "./context";

const NavigationMobileTrigger: React.FC = () => {
  const navbarContext = useNavbarContext();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group relative block",
            "h-10 w-10 rounded-full p-2",
            "hover:bg-neutral-100",
          )}
          type="button"
          aria-label="menu"
          onClick={() => navbarContext.handleIsOpen(!navbarContext.isOpen)}
        >
          <HamburgerMenuIcon className="h-full w-full" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        align="end"
        className="border border-gray-200 bg-gray-100 text-gray-900"
      >
        Open Menu
      </TooltipContent>
    </Tooltip>
  );
};

export default NavigationMobileTrigger;
