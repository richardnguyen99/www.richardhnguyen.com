import * as React from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { getAllCategories, getAllTags, getLatestMdxContent } from "@/lib/mdx";
import NavbarNavigationMenu from "./navigation-menu";

const Navbar: React.FC = async () => {
  const mostViewedCategories = Array.from(
    (await getAllCategories()).entries(),
  ).map(([key, value]) => ({
    category: key,
    url: value.url,
  }));

  const mostViewedTags = Array.from((await getAllTags()).entries())
    .sort((a, b) => {
      return b[1].postCount - a[1].postCount;
    })
    .slice(0, 5)
    .reduce(
      (acc, [key, value]) => {
        acc.push({
          tag: key,
          url: value.url,
        });

        return acc;
      },
      [] as {
        tag: string;
        url: string;
      }[],
    );

  const latestPost = (await getLatestMdxContent(1)).map((mdxContent) => {
    return mdxContent.frontMatter;
  });

  return (
    <header
      aria-label="Main Navigation"
      className={cn(
        "fixed top-0 z-[100]",
        "m-auto w-full max-w-full md:py-0",
        "ease-curve-d transition-header transform-gpu",
      )}
    >
      <NavbarNavigationMenu
        latestPost={latestPost[0]}
        mostViewedCategories={mostViewedCategories}
        mostViewedTags={mostViewedTags}
      />
    </header>
  );
};

export default Navbar;
