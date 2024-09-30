"use client";

import * as React from "react";
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
import { useNavbarContext } from "./context";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const navbarContext = useNavbarContext();
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
              "hover:bg-neutral-100",
              "ease-curve-d transition-opacity duration-300",
              {
                "opacity-0": navbarContext.isOpen,
                "opacity-100": !navbarContext.isOpen,
              },
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
          className="border border-gray-200 bg-gray-100 text-gray-900"
        >
          {displayTooltipContent()}
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align={isSmallScreen ? "center" : "end"}
        className="z-[100] w-48 border border-gray-200"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          {mounted && (
            <>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            </>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
