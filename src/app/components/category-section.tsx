import React, { type JSX } from "react";

import { getMdxContents } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import CategoryCard from "./category-card";

interface CategorySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category: string;
}

export default async function CategorySection({
  title,
  category,
  className,
  ...rest
}: CategorySectionProps): Promise<JSX.Element> {
  "use cache";

  const data = await getMdxContents({
    limit: 5,
    sortOrder: "desc",
    filter: (content) =>
      content.frontMatter.category === category &&
      (process.env.NODE_ENV === "development" || content.frontMatter.published),
  });

  return (
    <section
      {...rest}
      id={`${category}-section`}
      className={cn("overflow-hidden pt-32", className)}
    >
      <div className="mx-(--gutter-size) w-(--container-size)">
        <div className="">
          <div>
            <h2 className="font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Category
            </h2>
            <h3 className="mt-2 text-4xl font-medium tracking-tighter text-pretty text-gray-950 sm:text-6xl dark:text-white">
              {title}
            </h3>
          </div>
        </div>
      </div>

      <ul className="mx-auto mt-16 flex snap-x snap-mandatory scrollbar-none gap-10 overflow-x-auto overscroll-x-contain scroll-smooth px-(--gutter-size) [&::-webkit-scrollbar]:hidden">
        {data.map((post, i) => (
          <CategoryCard key={i} post={post} />
        ))}
      </ul>
    </section>
  );
}
