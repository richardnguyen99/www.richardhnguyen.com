"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { FrontMatter } from "@/lib/mdx";
import { useNavbarContext } from "./context";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleContentItem,
  CollapsibleHeading,
} from "./collapsible";

export type NavigationMobileProps = {
  latestPost: FrontMatter;
  mostViewedCategories: Array<{
    url: string;
    category: string;
  }>;
  mostViewedTags: Array<{
    url: string;
    tag: string;
  }>;
};

const NavigationMobile: React.FC<NavigationMobileProps> = ({
  mostViewedCategories,
  mostViewedTags,
}) => {
  const navbarContext = useNavbarContext();

  return (
    <div
      className={cn(
        "ease-curve-d transform-gpu transition-opacity duration-300",
        "pointer-events-none absolute opacity-0",
        "md:!pointer-events-none md:!hidden md:!opacity-0",
        "h-screen w-full",
        {
          "pointer-events-auto opacity-100": navbarContext.isOpen,
        },
      )}
      aria-expanded={true}
    >
      <div className="relative h-full max-h-[calc(100vh_-_(50px+(16px*2)))] w-full overflow-y-auto">
        <ul
          id="mobile-menu"
          className={cn(
            "text-small mx-[--gutter-size] flex w-[var(--container-size)] flex-col justify-between gap-4 pb-[3rem] pt-[3rem]",
            {
              invisible: !navbarContext.isOpen,
            },
          )}
        >
          <CollapsibleTrigger>
            <CollapsibleHeading>Categories</CollapsibleHeading>
            <CollapsibleContent>
              {mostViewedCategories.map((category, i) => (
                <CollapsibleContentItem key={i}>
                  <Link href={category.url} className="text-black">
                    {category.category}
                  </Link>
                </CollapsibleContentItem>
              ))}
            </CollapsibleContent>
          </CollapsibleTrigger>

          <CollapsibleTrigger>
            <CollapsibleHeading>Tags</CollapsibleHeading>
            <CollapsibleContent>
              {mostViewedTags.map((tag, i) => (
                <CollapsibleContentItem key={i}>
                  <Link href={tag.url} className="text-black">
                    {tag.tag}
                  </Link>
                </CollapsibleContentItem>
              ))}
            </CollapsibleContent>
          </CollapsibleTrigger>
        </ul>
      </div>
    </div>
  );
};

export default NavigationMobile;
