import * as React from "react";

import LatestArticleSection from "./latest-article-section";
import { cn } from "@/lib/utils";

const LatestArticleSectionSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn("col-span-12 row-span-1", className)}>
    <div className="ease-curve-a duration-250 group relative z-0 block aspect-[16/9] h-full w-full max-w-[68rem] animate-pulse overflow-hidden rounded-md bg-accent transition [&>div]:h-full"></div>
  </div>
);

const LatestArticleContainer: React.FC = async () => {
  return (
    <section className="max-w-full">
      <div className="mx-[var(--gutter-size)] flex w-[var(--container-size)] flex-col items-center pb-16">
        <span className="font-mono">Richard H. Nguyen</span>
        <h1 className="text-5xl font-semibold leading-[110%] tracking-tight">
          Latest Posts
        </h1>
      </div>

      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
        <React.Suspense
          fallback={
            <div className="col-span-12 grid grid-cols-12 gap-3 lg:grid-rows-2">
              <LatestArticleSectionSkeleton className="lg:col-span-8 lg:row-span-2 lg:row-start-1" />
              <LatestArticleSectionSkeleton className="md:col-span-6 lg:col-span-4 lg:row-span-1 lg:row-start-1" />
              <LatestArticleSectionSkeleton className="md:col-span-6 lg:col-span-4 lg:row-span-1 lg:row-start-2" />
            </div>
          }
        >
          <LatestArticleSection />
        </React.Suspense>
      </div>
    </section>
  );
};

export default LatestArticleContainer;
