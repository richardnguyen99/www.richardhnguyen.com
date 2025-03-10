"use client";

import React, { type JSX } from "react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [mounted, setMounted] = React.useState(false);
  const [isDropped, setIsDropped] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const displayTooltipContent = React.useCallback(() => {
    if (theme === "system") {
      return "System Mode";
    }

    return theme === "dark" ? "Dark Mode" : "Light Mode";
  }, [theme]);

  React.useEffect(() => setMounted(true), []);

  return (
    <DropdownMenu onOpenChange={(value) => setIsDropped(value)}>
      <Tooltip open={!isDropped && showTooltip}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger
            className={cn(
              "group relative block",
              "h-10 w-10 rounded-full p-2",
              "hover:bg-neutral-100 dark:hover:bg-neutral-700",
              "ease-curve-d transition-opacity duration-300",
            )}
            type="button"
            aria-label="Search"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {mounted && (
              <span>
                {theme === "system" ? (
                  <DesktopIcon className="h-full w-full" />
                ) : theme === "dark" ? (
                  <MoonIcon className="h-full w-full" />
                ) : (
                  <SunIcon className="h-full w-full" />
                )}
              </span>
            )}
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent
          align={isSmallScreen ? "center" : "end"}
          className="border border-neutral-200 bg-neutral-100 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        >
          {displayTooltipContent()}
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align={isSmallScreen ? "center" : "end"}
        className="z-[100] w-48 border border-neutral-200 dark:border-neutral-700 dark:bg-black"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />

        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem
            value="system"
            className="bg-neutral-200/0 hover:bg-neutral-200/30 dark:bg-black dark:hover:bg-neutral-500/30"
          >
            System
          </DropdownMenuRadioItem>
          {mounted && (
            <>
              <DropdownMenuRadioItem
                value="light"
                className="bg-neutral-200/0 hover:bg-neutral-200/30 dark:bg-black dark:hover:bg-neutral-500/30"
              >
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="dark"
                className="bg-neutral-200/0 hover:bg-neutral-200/30 dark:bg-black dark:hover:bg-neutral-500/30"
              >
                Dark
              </DropdownMenuRadioItem>
            </>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
