import React, { type JSX } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FooterGridProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  title: string;
}

export default function FooterGridSkeleton({
  title,
}: FooterGridProps): JSX.Element {
  return (
    <div className="w-full lg:w-4/12">
      <div className="relative flex items-center lg:mx-0">
        <div className="flex-grow border-t border-gray-700 lg:hidden"></div>
        <button
          type="button"
          className="mx-2 flex flex-shrink items-center gap-2 overflow-hidden lg:pointer-events-none lg:mx-0 lg:block lg:flex-shrink-0 lg:select-none lg:gap-0"
        >
          <h3 className="text-lg text-gray-400">{title}</h3>
          <ChevronDownIcon
            className={cn(
              "ease-curve-c h-4 w-4 rotate-0 transform-gpu text-gray-700 transition-[transform] duration-300 lg:invisible lg:hidden",
            )}
          />
        </button>
        <div className="flex-grow border-t border-gray-700 lg:hidden"></div>
      </div>

      <ul
        className={cn(
          "ease-curve-d mt-6 flex transform-gpu flex-col gap-4 overflow-hidden transition-all duration-300",
        )}
      >
        <Skeleton className="hidden h-[26px] w-full lg:block" />
        <Skeleton className="hidden h-[26px] w-full lg:block" />
        <Skeleton className="hidden h-[26px] w-full lg:block" />
        <Skeleton className="hidden h-[26px] w-full lg:block" />
        <Skeleton className="hidden h-[26px] w-full lg:block" />
      </ul>
    </div>
  );
}
