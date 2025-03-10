import React, { type JSX } from "react";

import { getAllCategories } from "@/lib/mdx";
import CategorySectionSkeleton from "./category-section-skeleton";
import CategorySection from "./category-section";
import { capitalizeKeywords } from "@/lib/utils";

export default async function CategoryContainer(): Promise<JSX.Element> {
  const categories = Array.from((await getAllCategories()).entries())
    .sort((a, b) => b[1].postCount - a[1].postCount)
    .map(([key]) => key);

  return (
    <React.Fragment>
      {categories.map((category, i) => (
        <React.Suspense
          key={i}
          fallback={
            <CategorySectionSkeleton
              title={capitalizeKeywords(category)}
              category={category}
            />
          }
        >
          <CategorySection
            title={capitalizeKeywords(category)}
            category={category}
          />
        </React.Suspense>
      ))}
    </React.Fragment>
  );
}
