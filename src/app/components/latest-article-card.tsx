import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { type FrontMatter } from "@/types/mdx";

type Props = {
  frontMatter: FrontMatter;
} & React.HTMLAttributes<HTMLDivElement>;

export default function LatestArticleCard({
  frontMatter,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <div {...rest} className={cn("col-span-12 row-span-1", className)}>
      <Link
        href={`/blogs/${frontMatter.slug}`}
        className="ease-curve-a group bg-accent relative z-0 block aspect-[16/9] h-full w-full max-w-[68rem] overflow-hidden rounded-md transition duration-250 [&>div]:h-full"
        aria-label="View Item"
      >
        <div className="ease-curve-d pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden p-3 opacity-100 transition-[opacity,background] duration-300">
          <div className="ease-curve-d pointer-events-none absolute inset-x-0 inset-y-0 z-20 flex h-full w-full flex-col justify-between text-gray-100 opacity-100 transition-opacity duration-300">
            <div className="relative z-50 h-full w-full">
              <div className="text-4 absolute top-[1rem] left-0 flex w-full flex-wrap items-center gap-2">
                <div className="ml-4 truncate">
                  <span className="block text-xs leading-[1.3]">
                    {frontMatter.category}
                  </span>
                </div>
                <DotFilledIcon className="h-2 w-2" />
                <span className="break-none block truncate text-xs leading-[1.3]">
                  {frontMatter.date.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="absolute right-0 bottom-[1rem] left-[1rem] leading-snug text-balance">
                <div className="text-[15px] font-semibold text-white">
                  <div className="mt-4 line-clamp-2 items-start text-lg leading-[1.3] text-balance md:mt-6">
                    {frontMatter.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="[&_img]:ease-curve-d ease-curve-c relative mx-auto h-full w-full max-w-[180rem] rounded-md transition-opacity duration-300 [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-[transform,filter] [&_img]:duration-300 group-hover:[&_img]:scale-105 group-hover:[&_img]:blur-sm group-hover:[&_img]:drop-shadow-[0_0_120px_rgba(0,0,0,1)] group-hover:[&_img]:saturate-50">
          <div className="relative h-full w-full">
            <div className="ease-curve-d relative aspect-[16/9] h-full w-full overflow-hidden rounded-none bg-transparent transition-[background] duration-300">
              <div className="ease-curve-d absolute inset-0 z-0 h-full w-full bg-transparent transition-colors duration-300 group-hover:bg-black/40"></div>
              <Image
                src={frontMatter.thumbnail}
                alt="Next.js vs Gatsby.js"
                className="object-cover object-center"
                fill={true}
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority={true}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
