"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavigationMenuLink as UINavigationMenuLink } from "@/components/ui/navigation-menu";
import { type FrontMatter } from "@/types/mdx";
import { useNavbarContext } from "./context";
import NavigationIconButton from "./navigation-icon-button";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleContentItem,
  CollapsibleHeading,
} from "./collapsible";
import NavigationMenuLatestPost from "./navigation-menu-latest-post";
import { Menu } from "lucide-react";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
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

const NavigationMobileButton: React.FC<Props> = ({
  containerRef,
  latestPost,
  mostViewedCategories,
  mostViewedTags,
}) => {
  const mobileButtonRef = React.useRef<HTMLButtonElement>(null);
  const navbarContext = useNavbarContext();

  const handleClick = React.useCallback(() => {
    if (navbarContext.isOpen) {
      if (navbarContext.tab === "mobile") {
        navbarContext.close();
        navbarContext.setTab(null);
      }
    } else {
      navbarContext.open();
      navbarContext.setTab("mobile");
    }
  }, [navbarContext]);

  return (
    <Popover
      onOpenChange={(newValue) => {
        if (!newValue) {
          navbarContext.close();
          navbarContext.setTab(null);
        }
      }}
      open={navbarContext.isOpen && navbarContext.tab === "mobile"}
      modal={false}
    >
      <PopoverTrigger asChild>
        <NavigationIconButton
          ref={mobileButtonRef}
          onClick={handleClick}
          renderIcon={() => <Menu className="h-full w-full" />}
          className={cn({
            "pointer-events-none cursor-default":
              navbarContext.tab !== null && navbarContext.tab === "mobile",

            "stroke-neutral-400 dark:stroke-neutral-700":
              navbarContext.tab !== null && navbarContext.tab !== "mobile",
          })}
        >
          <p>Open Menu</p>
        </NavigationIconButton>
      </PopoverTrigger>
      <PopoverContent
        container={containerRef.current}
        className="mt-4 w-full border-none bg-transparent p-0"
        side="top"
        align="start"
      >
        <ul>
          <CollapsibleTrigger>
            <CollapsibleHeading>Categories</CollapsibleHeading>
            <CollapsibleContent>
              {mostViewedCategories.map((category, i) => (
                <CollapsibleContentItem key={i}>
                  <Link href={category.url} passHref legacyBehavior>
                    <UINavigationMenuLink>
                      {category.category}
                    </UINavigationMenuLink>
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
                  <Link href={tag.url} passHref legacyBehavior>
                    <UINavigationMenuLink className="text-black">
                      {tag.tag}
                    </UINavigationMenuLink>
                  </Link>
                </CollapsibleContentItem>
              ))}
            </CollapsibleContent>
          </CollapsibleTrigger>
        </ul>

        <NavigationMenuLatestPost
          className="mx-[var(--gutter-size)] w-[var(--container-size)]"
          isListReady={true}
          latestPost={latestPost}
        />
      </PopoverContent>
    </Popover>
  );
};

export default NavigationMobileButton;
