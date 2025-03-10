import React, { type JSX } from "react";
import Link from "next/link";

import CategorySection from "./components/category-section";
import LatestArticleContainer from "./components/latest-article-container";

export default function Home(): JSX.Element {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleContainer />

      <React.Suspense fallback={null}>
        <CategorySection title="API Design" category="api" />
        <CategorySection title="Programming" category="programming" />
        <CategorySection title="Computer Network" category="computer-network" />
        <CategorySection title="Web Development" category="web-development" />

        <div className="mt-12 max-w-full sm:mt-16 md:mt-20">
          <div className="mx-[var(--gutter-size)] flex w-[var(--container-size)] items-center justify-center">
            <Link
              href="/blogs"
              className="flex w-full max-w-full items-center justify-center rounded-full bg-black px-6 py-4 text-white lg:max-w-[280px] dark:bg-white dark:text-black"
            >
              More
            </Link>
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}
