import React, { type JSX } from "react";
import { cn } from "@/lib/utils";

export default async function CategoryContainerSkeleton(): Promise<JSX.Element> {
  return (
    <section className={cn("overflow-hidden pt-32")}>
      <div className="mx-(--gutter-size) w-(--container-size)">
        <div className="">
          <div>
            <h2 className="font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Category
            </h2>
            <div className="mt-2 h-15 w-7 animate-pulse bg-gray-300 text-4xl font-medium tracking-tighter text-pretty text-gray-950 sm:text-6xl dark:bg-gray-950">
              Something
            </div>
          </div>
        </div>
      </div>

      <ul className="mx-auto mt-16 flex snap-x snap-mandatory scrollbar-none gap-10 overflow-x-auto overscroll-x-contain scroll-smooth px-(--gutter-size) [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={`${i}`}
            data-slice-index={i}
            className="group relative flex aspect-3/4 w-52 shrink-0 snap-start scroll-ml-(--gutter-size) flex-col justify-end overflow-hidden rounded-xl sm:w-64 sm:rounded-xl md:w-72 md:rounded-2xl lg:w-80"
          >
            <div>
              <div className="[&_img]:ease-curve-d [&_img]:duration-normal [&_video]:ease-curve-d [&_video]:duration-normal ease-curve-c duration-normal relative mx-auto h-full w-full max-w-5xl rounded-s transition-opacity [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-transform group-hover:[&_img]:scale-105 [&_video]:transform-gpu [&_video]:transition-transform group-hover:[&_video]:scale-105">
                <div className="relative aspect-3/4 h-full w-full">
                  <div className="duration-normal ease-curve-d bg-accent relative aspect-3/4 h-full w-full transform-gpu animate-pulse overflow-hidden rounded-none transition-[background,transform] duration-300"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
