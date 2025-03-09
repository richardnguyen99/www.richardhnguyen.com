import React, { type JSX } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function BlogGridSkeleton(): JSX.Element {
  return (
    <React.Fragment>
      <div className="mx-[var(--gutter-size)] flex justify-between gap-4 sm:w-[var(--container-size)]">
        <div className="flex w-full flex-col">
          <Skeleton className="h-5 w-full max-w-20" />

          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
            <h3 className="mt-2 text-pretty text-6xl font-medium tracking-tighter text-neutral-950 dark:text-white sm:text-4xl md:text-2xl">
              Latest Blog
            </h3>

            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
        <ul className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((post, i) => (
            <Skeleton key={i} className="ease-curve-c col-span-1">
              <div className="aspect-[3/4] w-full max-w-full"></div>
            </Skeleton>
          ))}
        </ul>

        <nav className="mx-auto mt-14 flex w-full justify-center">
          <ul className="flex flex-row items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-md" />
            ))}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}
