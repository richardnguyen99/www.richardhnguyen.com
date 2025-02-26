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

  const handleClick = React.useCallback(() => {
    if (navbarContext.isOpen) {
      navbarContext.close();
      navbarContext.setTab(null);
    } else {
      navbarContext.open();
      navbarContext.setTab("navigation");
    }
  }, [navbarContext]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group relative block",
            "h-10 w-10 rounded-full p-2",
            "hover:bg-neutral-100 dark:hover:bg-neutral-700",
            "block md:hidden",
            {
              "pointer-events-none stroke-neutral-400 dark:stroke-neutral-700":
                navbarContext.tab !== null && navbarContext.tab === "search",
            },
          )}
          type="button"
          aria-label="menu"
          onClick={handleClick}
        >
          <HamburgerMenuIcon className="pointer-events-none h-full w-full" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        align="end"
        className="border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
      >
        Open Menu
      </TooltipContent>
    </Tooltip>
  );
};

export default NavigationMobileTrigger;
