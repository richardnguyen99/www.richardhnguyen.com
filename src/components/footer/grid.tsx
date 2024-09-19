"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";

interface FooterGridProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  title: string;
}

const FooterGrid: React.FC<FooterGridProps> = ({
  title,
  className,
  children,
  ...rest
}) => {
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
        <div className="flex-grow border-t border-gray-700 lg:hidden"></div>
        <button
          aria-expanded={isOpen}
          aria-controls={`${snakeCaseTitle}-footer-grid`}
          type="button"
          disabled={isLargeScreen}
          aria-disabled={isLargeScreen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="mx-2 flex flex-shrink items-center gap-2 overflow-hidden lg:pointer-events-none lg:mx-0 lg:block lg:flex-shrink-0 lg:select-none lg:gap-0"
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
        <div className="flex-grow border-t border-gray-700 lg:hidden"></div>
      </div>

      <ul
        className={cn(
          "ease-curve-d mt-6 flex transform-gpu flex-col gap-4 overflow-hidden transition-all duration-300",
          {
            "max-h-0 opacity-0": !isOpen,
            "max-h-[50rem] opacity-100": isOpen || isLargeScreen,
          },
        )}
      >
        {children}
      </ul>
    </div>
  );
};

export default FooterGrid;
