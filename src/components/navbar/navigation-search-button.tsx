"use client";

import * as React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavbarContext } from "./context";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const NavigationSearchButton: React.FC<Props> = ({ containerRef }) => {
  const navbarContext = useNavbarContext();

  const handleClick = React.useCallback(() => {
    console.log("open", navbarContext.isOpen);
    if (navbarContext.isOpen) {
      navbarContext.close();
    } else {
      navbarContext.open();
    }
  }, [navbarContext]);

  return (
    <Popover onOpenChange={navbarContext.handleIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group relative block",
            "h-10 w-10 rounded-full p-2",
            "hover:bg-neutral-100 dark:hover:bg-neutral-700",
            "ease-curve-d transition-opacity duration-300",
            {
              "pointer-events-none opacity-0": navbarContext.isOpen,
              "pointer-events-auto opacity-100": !navbarContext.isOpen,
            },
          )}
          type="button"
          aria-label="Search"
          onClick={handleClick}
        >
          <MagnifyingGlassIcon className="h-full w-full" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        container={containerRef.current}
        className="mx-[var(--gutter-size)] w-[var(--container-size)] border-none bg-transparent"
        side="top"
        align="start"
      >
        <form>
          <input />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NavigationSearchButton;
