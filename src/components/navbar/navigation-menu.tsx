"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { FrontMatter } from "@/lib/mdx";
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuContent as UNavigationMenuContent,
  NavigationMenuItem as UINavigationMenuItem,
  NavigationMenuList as UINavigationList,
  NavigationMenuTrigger as UINavigationMenuTrigger,
  NavigationMenuLink as UINavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useNavbarContext } from "./context";
import NavigationMobile from "./navigation-mobile";
import NavigationMenuList from "./navigation-menu-list";
import NavigationMenuLatestPost from "./navigation-menu-latest-post";

const NavigationSkeletonButton = () => (
  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 p-2"></div>
);

const NavigationMobileTrigger = dynamic(
  () => import("./navigation-mobile-trigger"),
  {
    ssr: false,
    loading: NavigationSkeletonButton,
  },
);

const NavigationSearchButton = dynamic(
  () => import("./navigation-search-button"),
  {
    ssr: false,
    loading: NavigationSkeletonButton,
  },
);

const ThemeSwitcher = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: NavigationSkeletonButton,
});

export type HeaderDataProps = {
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

const NavigationMenu: React.FC<HeaderDataProps> = ({
  latestPost,
  mostViewedCategories,
  mostViewedTags,
}) => {
  const navbarContext = useNavbarContext();
  const [isListReady, setIsListReady] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<number | null>(null);

  const handleValueChange = React.useCallback(
    (value: string) => {
      if (value === "" || value.length === 0) {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }

        navbarContext.handleIsOpen(false);
        setIsListReady(false);
      } else {
        const id = window.setTimeout(() => {
          setIsListReady(true);
        }, 300);
        setTimeoutId(id);
        navbarContext.handleIsOpen(true);
      }
    },
    [navbarContext, timeoutId],
  );

  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <UINavigationMenu
      className="bg-transparent"
      onValueChange={handleValueChange}
    >
      <div
        className={cn(
          "pointer-events-none z-[-1] transform-gpu opacity-0 lg:-translate-y-[100%]",
          "ease-out-cubic transition-[opacity,transform] duration-300",
          "absolute left-1/2 top-0 h-[calc(100vh-1rem)] w-[200%] lg:h-[42.5rem]",
          "-translate-x-[100vw] bg-gradient-to-b from-white from-60% to-white/0 lg:from-80%",
          {
            "opacity-100 lg:-translate-y-1/2": navbarContext.isOpen,
          },
        )}
      ></div>

      <div
        className={cn(
          "ease-out-cubic relative z-50 mx-auto h-full min-h-[3.125rem] w-full transform-gpu bg-white/80 backdrop-blur transition-colors duration-700 md:h-[3.125rem]",
          {
            "bg-white/0": navbarContext.isOpen,
          },
        )}
      >
        <div
          className={cn(
            "ease-curve-d relative mx-[var(--gutter-size)] flex min-h-[3.125rem] w-[var(--container-size)] items-center justify-between transition duration-300 [&>div]:h-full",
          )}
        >
          <Link href="/" passHref legacyBehavior>
            <UINavigationMenuLink
              className={cn(
                "flex items-center justify-center",
                "h-10 w-10 rounded-full p-2",
                "hover:bg-slate-100",
              )}
            >
              <div className="h-full w-full bg-black"></div>
            </UINavigationMenuLink>
          </Link>

          <div
            className={cn(
              "ml-auto flex items-center justify-center gap-[0.5rem] md:hidden",
            )}
          >
            <ThemeSwitcher />
            <NavigationSearchButton />
            <NavigationMobileTrigger />
          </div>

          <div className="[&>div]:!static [&>div]:h-full">
            <UINavigationList
              className={cn(
                "hidden h-full items-center justify-center md:flex",
              )}
            >
              <UINavigationMenuItem>
                <UINavigationMenuTrigger className="bg-gray-500/0">
                  Articles
                </UINavigationMenuTrigger>

                <UNavigationMenuContent className="lg:left-[calc(0.5_*_(100%-var(--container-size)))]">
                  <div className="data-[]: relative grid w-full grid-cols-[repeat(2,calc(20px+(0.5*(min(100%,68rem)-352px))))_1fr]">
                    <NavigationMenuList
                      title="Categories"
                      initialDelay={0}
                      items={mostViewedCategories.map((category) => ({
                        text: category.category,
                        url: category.url,
                      }))}
                      isListReady={isListReady}
                    />

                    <NavigationMenuList
                      title="Tags"
                      initialDelay={mostViewedCategories.length * 50}
                      items={mostViewedTags.map((tag) => ({
                        text: tag.tag,
                        url: tag.url,
                      }))}
                      isListReady={isListReady}
                    />

                    <NavigationMenuLatestPost
                      isListReady={isListReady}
                      initialDelay={
                        (mostViewedCategories.length +
                          mostViewedTags.length +
                          1) *
                        50
                      }
                      latestPost={latestPost}
                    />
                  </div>
                </UNavigationMenuContent>
              </UINavigationMenuItem>

              <UINavigationMenuItem>
                <UINavigationMenuTrigger className="bg-gray-500/0">
                  Gists
                </UINavigationMenuTrigger>
                <UNavigationMenuContent className="lg:left-[calc(0.5_*_(100%-var(--container-size)))]"></UNavigationMenuContent>
              </UINavigationMenuItem>

              <UINavigationMenuItem>
                <UINavigationMenuTrigger className="bg-gray-500/0">
                  About
                </UINavigationMenuTrigger>
                <UNavigationMenuContent className="lg:left-[calc(0.5_*_(100%-var(--container-size)))]"></UNavigationMenuContent>
              </UINavigationMenuItem>
            </UINavigationList>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <NavigationSearchButton />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <NavigationMobile
        mostViewedCategories={mostViewedCategories}
        mostViewedTags={mostViewedTags}
        latestPost={latestPost}
      />
    </UINavigationMenu>
  );
};

export default NavigationMenu;
