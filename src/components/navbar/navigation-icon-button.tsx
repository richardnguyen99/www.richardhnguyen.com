"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = React.PropsWithChildren<{
  onClick: () => void;
  renderIcon: () => React.ReactNode;
}> &
  React.ComponentPropsWithoutRef<"button">;

const NavigationIconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick, renderIcon, className, children, ...rest }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            {...rest}
            ref={ref}
            className={cn(
              "group relative block",
              "h-10 w-10 rounded-full p-2",
              "hover:bg-neutral-100 dark:hover:bg-neutral-700",
              "block md:hidden",
              className,
            )}
            type="button"
            aria-label="menu"
            onClick={onClick}
          >
            {renderIcon()}
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className="border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        >
          {children}
        </TooltipContent>
      </Tooltip>
    );
  },
);

NavigationIconButton.displayName = "NavigationIconButton";

export default NavigationIconButton;
