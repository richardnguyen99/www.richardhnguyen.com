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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

  const handleClickCapture = React.useCallback(() => {
    navbarContext.close();
    navbarContext.setTab(null);
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
            "bg-neutral-100 dark:bg-neutral-700":
              navbarContext.isOpen && navbarContext.tab === "mobile",
          })}
        >
          <p>Open Menu</p>
        </NavigationIconButton>
      </PopoverTrigger>
      <PopoverContent
        container={containerRef.current}
        className="mt-4 w-full border-none bg-transparent p-0 shadow-none"
        side="top"
        align="start"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl">Categories</AccordionTrigger>
            <AccordionContent onClickCapture={handleClickCapture}>
              <ul>
                {mostViewedCategories.map((category, i) => (
                  <li key={i}>
                    <Link href={category.url} passHref legacyBehavior>
                      <UINavigationMenuLink className="text-lg text-muted-foreground hover:text-accent-foreground">
                        {category.category}
                      </UINavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl">Tags</AccordionTrigger>
            <AccordionContent onClickCapture={handleClickCapture}>
              <ul>
                {mostViewedTags.map((tag, i) => (
                  <li key={i}>
                    <Link href={tag.url} passHref legacyBehavior>
                      <UINavigationMenuLink className="text-lg text-muted-foreground hover:text-accent-foreground">
                        {tag.tag}
                      </UINavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <NavigationMenuLatestPost isListReady={true} latestPost={latestPost} />
      </PopoverContent>
    </Popover>
  );
};

export default NavigationMobileButton;
