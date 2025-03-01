"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { type FrontMatter } from "@/types/mdx";
import { type Repository, type Gist } from "@/types/github";
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuContent as UNavigationMenuContent,
  NavigationMenuItem as UINavigationMenuItem,
  NavigationMenuList as UINavigationList,
  NavigationMenuTrigger as UINavigationMenuTrigger,
  NavigationMenuLink as UINavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useNavbarContext } from "./context";
import NavigationMenuList from "./navigation-menu-list";
import NavigationMenuLatestPost from "./navigation-menu-latest-post";

const NavigationSkeletonButton = () => (
  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 p-2 dark:bg-neutral-900"></div>
);

const NavigationMobileSkeletonButton = () => (
  <div className="block h-10 w-10 animate-pulse rounded-full bg-neutral-200 p-2 dark:bg-neutral-900 md:hidden"></div>
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

const NavigationMobileButton = dynamic(
  () => import("./navigation-mobile-button"),
  {
    ssr: false,
    loading: NavigationMobileSkeletonButton,
  },
);

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

  pinnedRepos: Repository[];
  pinnedGists: Gist[];
  pinnedProjects: Pick<Repository, "name" | "description" | "url">[];
};

const NavigationMenu: React.FC<HeaderDataProps> = ({
  latestPost,
  mostViewedCategories,
  mostViewedTags,
  pinnedGists,
  pinnedRepos,
  pinnedProjects,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
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
        navbarContext.setTab(null);
        setIsListReady(false);
      } else {
        const id = window.setTimeout(() => {
          setIsListReady(true);
        }, 300);
        setTimeoutId(id);
        navbarContext.handleIsOpen(true);
        navbarContext.setTab("navigation");
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
          "z-[-1] -translate-y-[100%] transform-gpu opacity-0",
          "ease-out-cubic transition-[opacity,transform] duration-300",
          "absolute left-1/2 top-0 h-[calc(100vh-1rem)] w-[200%] lg:h-[80rem]",
          "-translate-x-[100vw] bg-gradient-to-b from-white from-60% to-white/0 dark:from-black dark:to-black/0 lg:from-80%",
          {
            "-translate-y-1/4 opacity-100 lg:-translate-y-1/2":
              navbarContext.isOpen,
          },
        )}
      ></div>

      <div
        ref={containerRef}
        className={cn(
          "absolute top-0 z-40 flex min-h-11 w-full flex-col justify-center overflow-hidden",
          "[&>div]:!mx-[var(--gutter-size)]",
          "md[&>div]:!w-[var(--container-size)] [&>div]:!w-[calc(100%-var(--gutter-size)*2)] [&>div]:!min-w-0",
          "[&>div]:!translate-x-0 [&>div]:!translate-y-12",
          "",
        )}
      ></div>

      <div
        className={cn(
          "ease-out-cubic relative z-50 mx-auto h-full min-h-[3.125rem] w-full bg-white/80 backdrop-blur dark:bg-black/80 md:h-[3.125rem]",
          {
            "bg-white/0 dark:bg-black/0": navbarContext.isOpen,
          },
        )}
      >
        <div
          className={cn(
            "relative mx-[var(--gutter-size)] flex min-h-[3.125rem] w-[var(--container-size)] items-center justify-between [&>div]:h-full",
          )}
        >
          <Link href="/" passHref legacyBehavior>
            <UINavigationMenuLink
              className={cn(
                "flex items-center justify-center",
                "h-10 w-10 rounded-full p-2",
                "hover:bg-neutral-100 dark:hover:bg-neutral-700",
              )}
            >
              <div className="h-full w-full bg-black dark:bg-white"></div>
            </UINavigationMenuLink>
          </Link>

          <div className="[&>div]:!static [&>div]:h-full">
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
                <UINavigationMenuTrigger className="transition-none duration-0">
                  Projects
                </UINavigationMenuTrigger>
                <UNavigationMenuContent className="md:left-[calc(0.5_*_(100%-var(--container-size)))]">
                  <div className="data-[]: relative grid grid-cols-3 gap-3">
                    <NavigationMenuList
                      title="Repositories"
                      initialDelay={0}
                      items={pinnedRepos.map((repo) => ({
                        text: repo.name,
                        url: repo.url,
                        external: true,
                      }))}
                      isListReady={isListReady}
                    />

                    <NavigationMenuList
                      title="Gists"
                      initialDelay={pinnedRepos.length * 50}
                      items={pinnedGists.map((gist) => ({
                        text: gist.files[0].name,
                        url: gist.url,
                        external: true,
                      }))}
                      isListReady={isListReady}
                    />

                    <NavigationMenuList
                      title="Projects"
                      initialDelay={
                        (pinnedRepos.length + pinnedGists.length) * 50
                      }
                      items={pinnedProjects.map((project) => ({
                        text: project.name,
                        url: project.url,
                        external: true,
                      }))}
                      isListReady={isListReady}
                    />
                    <Link href="/projects" legacyBehavior passHref>
                      <UINavigationMenuLink
                        className={cn(
                          "mt-4 transform-gpu text-lg font-medium transition-opacity duration-300",
                          {
                            "opacity-0": !isListReady,
                            "opacity-100": isListReady,
                          },
                        )}
                        style={{
                          transitionDelay: `${
                            (pinnedRepos.length +
                              pinnedGists.length +
                              pinnedProjects.length +
                              1) *
                            50
                          }ms`,
                        }}
                      >
                        More at <code>/projects</code>
                      </UINavigationMenuLink>
                    </Link>
                  </div>
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

          <div className="flex items-center gap-3">
            <NavigationSearchButton containerRef={containerRef} />
            <ThemeSwitcher />
            <NavigationMobileButton
              containerRef={containerRef}
              mostViewedCategories={mostViewedCategories}
              mostViewedTags={mostViewedTags}
              latestPost={latestPost}
            />
          </div>
        </div>
      </div>
    </UINavigationMenu>
  );
};

export default NavigationMenu;
