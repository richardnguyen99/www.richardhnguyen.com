"use client";

import * as React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchKeyboardEvents } from "@/hooks/use-search-keyboard-events";
import { useNavbarContext } from "./context";
import SearchPanel from "./search-panel";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const NavigationSearchButton: React.FC<Props> = ({ containerRef }) => {
  const searchButtonRef = React.useRef<HTMLDivElement>(null);
  const navbarContext = useNavbarContext();

  const handleClick = React.useCallback(() => {
    if (navbarContext.isOpen) {
      if (navbarContext.tab === "search") {
        navbarContext.close();
        navbarContext.setTab(null);
      }
    } else {
      navbarContext.open();
      navbarContext.setTab("search");
    }
  }, [navbarContext]);

  useSearchKeyboardEvents({
    isOpen: navbarContext.isOpen,
    onOpen: navbarContext.open,
    onClose: navbarContext.close,
    setTab: navbarContext.setTab,
    searchButtonRef,
  });

  return (
    <Popover
      onOpenChange={(newValue) => {
        if (!newValue) {
          navbarContext.close();
          navbarContext.setTab(null);
        }
      }}
      open={navbarContext.tab === "search"}
      modal={false}
    >
      <PopoverTrigger
        className={cn({
          "pointer-events-none cursor-default":
            navbarContext.tab !== null && navbarContext.tab === "navigation",
        })}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={searchButtonRef}
              className={cn(
                "group relative block",
                "h-10 w-10 rounded-full p-2",
                "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                "ease-curve-d transition-opacity duration-300",
                {
                  "bg-neutral-100 dark:bg-neutral-700":
                    navbarContext.isOpen && navbarContext.tab === "search",

                  "stroke-neutral-400 dark:stroke-neutral-700":
                    navbarContext.tab !== null &&
                    navbarContext.tab === "navigation",
                },
              )}
              onClick={handleClick}
            >
              <MagnifyingGlassIcon className="h-full w-full" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="border border-neutral-200 bg-neutral-100 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
            <p>Search articles ...</p>
          </TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent
        container={containerRef.current}
        className="mt-4 w-full border-none bg-transparent p-0"
        side="top"
        align="start"
      >
        <SearchPanel
          onOpen={navbarContext.open}
          onClose={navbarContext.close}
          isOpen={navbarContext.isOpen}
        />
      </PopoverContent>
    </Popover>
  );
};

export default NavigationSearchButton;
