"use client";

import React, { type JSX } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";

interface FooterGridProps extends React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> {
  title: string;
}

export default function FooterGrid({
  title,
  className,
  children,
  ...rest
}: FooterGridProps): JSX.Element {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const snakeCaseTitle = title.toLowerCase().replace(/\s/g, "-");

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      {...rest}
      id={`${snakeCaseTitle}-footer-grid`}
      className={cn("", className)}
    >
      <div className="relative flex items-center lg:mx-0">
        <div className="grow border-t border-gray-700 lg:hidden"></div>
        <button
          aria-expanded={isOpen}
          aria-controls={`${snakeCaseTitle}-footer-grid`}
          type="button"
          disabled={isLargeScreen}
          aria-disabled={isLargeScreen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="mx-2 flex shrink items-center gap-2 overflow-hidden lg:pointer-events-none lg:mx-0 lg:block lg:shrink-0 lg:gap-0 lg:select-none"
        >
          <h3 className="text-lg text-gray-400">{title}</h3>
          <ChevronDownIcon
            className={cn(
              "ease-curve-c h-4 w-4 rotate-0 transform-gpu text-gray-700 transition-[transform] duration-300 lg:invisible lg:hidden",
              {
                "rotate-180": isOpen,
              },
            )}
          />
        </button>
        <div className="grow border-t border-gray-700 lg:hidden"></div>
      </div>

      <ul
        className={cn(
          "ease-curve-d mt-6 flex transform-gpu flex-col gap-4 overflow-hidden transition-all duration-300",
          {
            "max-h-0 opacity-0": !isOpen,
            "max-h-200 opacity-100": isOpen || isLargeScreen,
          },
        )}
      >
        {children}
      </ul>
    </div>
  );
}
