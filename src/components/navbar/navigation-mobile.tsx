"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "./context";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleContentItem,
  CollapsibleContentLink,
  CollapsibleHeading,
} from "./collapsible";

const NavigationMobile: React.FC = () => {
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
            "text-small container flex w-full flex-col justify-between pb-[3rem] pt-[3rem]",
            {
              invisible: !navbarContext.isOpen,
            },
          )}
        >
          <CollapsibleTrigger>
            <CollapsibleHeading>Getting started</CollapsibleHeading>
            <CollapsibleContent>
              <CollapsibleContentItem>
                <span className="text-black">Our research</span>
                <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                </ul>
              </CollapsibleContentItem>

              <CollapsibleContentItem>
                <span className="text-black">Our research</span>
                <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                </ul>
              </CollapsibleContentItem>
            </CollapsibleContent>
          </CollapsibleTrigger>

          <CollapsibleTrigger>
            <CollapsibleHeading>Getting started</CollapsibleHeading>
            <CollapsibleContent>
              <CollapsibleContentItem>
                <span className="text-black">Our research</span>
                <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                </ul>
              </CollapsibleContentItem>

              <CollapsibleContentItem>
                <span className="text-black">Our research</span>
                <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                  <li>
                    <CollapsibleContentLink href="/docs">
                      Overview
                    </CollapsibleContentLink>
                  </li>
                </ul>
              </CollapsibleContentItem>
            </CollapsibleContent>
          </CollapsibleTrigger>
        </ul>
      </div>
    </div>
  );
};

export default NavigationMobile;
