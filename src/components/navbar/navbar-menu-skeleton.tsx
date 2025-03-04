import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuContent as UNavigationMenuContent,
  NavigationMenuItem as UINavigationMenuItem,
  NavigationMenuList as UINavigationList,
  NavigationMenuTrigger as UINavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavigationMenuSkeleton: React.FC = () => {
  return (
    <header className="fixed top-0 z-[100] m-auto w-full max-w-full md:py-0">
      <UINavigationMenu className="bg-transparent">
        <div className="ease-out-cubic relative z-50 mx-auto h-full min-h-[3.125rem] w-full bg-white/80 backdrop-blur dark:bg-black/80 md:h-[3.125rem]">
          <div className="relative mx-[var(--gutter-size)] flex min-h-[3.125rem] w-[var(--container-size)] items-center justify-between [&>div]:h-full">
            <a className="flex h-10 w-10 items-center justify-center rounded-full p-2">
              <div className="h-full w-full bg-black dark:bg-white"></div>
            </a>

            <div className="[&>div]:!static [&>div]:h-full">
              <div className="position">
                <UINavigationList
                  className={cn(
                    "hidden h-full items-center justify-center md:flex",
                  )}
                >
                  <UINavigationMenuItem>
                    <UINavigationMenuTrigger className="transition-none duration-0">
                      Articles
                    </UINavigationMenuTrigger>

                    <UNavigationMenuContent className="md:left-[calc(0.5_*_(100%-var(--container-size)))]">
                      <div className="data-[]: relative grid w-full grid-cols-[repeat(2,calc(20px+(0.5*(min(100%,68rem)-352px))))_1fr]"></div>
                    </UNavigationMenuContent>
                  </UINavigationMenuItem>

                  <UINavigationMenuItem>
                    <UINavigationMenuTrigger className="transition-none duration-0">
                      Projects
                    </UINavigationMenuTrigger>
                    <UNavigationMenuContent className="md:left-[calc(0.5_*_(100%-var(--container-size)))]">
                      <div className="data-[]: relative grid grid-cols-3 gap-3"></div>
                    </UNavigationMenuContent>
                  </UINavigationMenuItem>

                  <UINavigationMenuItem>
                    <UINavigationMenuTrigger className="transition-none duration-0">
                      About
                    </UINavigationMenuTrigger>
                    <UNavigationMenuContent className="md:left-[calc(0.5_*_(100%-var(--container-size)))]"></UNavigationMenuContent>
                  </UINavigationMenuItem>
                </UINavigationList>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 p-2 dark:bg-neutral-900"></div>
              <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 p-2 dark:bg-neutral-900"></div>
              <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 p-2 dark:bg-neutral-900 md:hidden"></div>
            </div>
          </div>
        </div>
      </UINavigationMenu>
    </header>
  );
};

export default NavigationMenuSkeleton;
