import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { type FrontMatter } from "@/types/mdx";

type Props = {
  frontMatter: FrontMatter;
} & React.HTMLAttributes<HTMLDivElement>;

const LatestArticleCard: React.FC<Props> = ({
  frontMatter,
  className,
  ...rest
}) => (
  <div {...rest} className={cn("col-span-12 row-span-1", className)}>
    <Link
      href={`/blogs/${frontMatter.slug}`}
      className="ease-curve-a duration-250 group relative z-0 block aspect-[16/9] h-full w-full max-w-[68rem] overflow-hidden rounded-md bg-transparent transition [&>div]:h-full"
      aria-label="View Item"
    >
      <div className="ease-curve-d pointer-events-none absolute left-0 top-0 z-10 h-full w-full overflow-hidden p-3 opacity-100 transition-[opacity,background] duration-300">
        <div className="ease-curve-d pointer-events-none absolute inset-x-0 inset-y-0 z-20 flex h-full w-full flex-col justify-between text-gray-100 opacity-100 transition-opacity duration-300">
          <div className="relative z-50 h-full w-full">
            <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2">
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

            <div className="absolute bottom-[1rem] left-[1rem] right-0 text-balance leading-snug">
              <div className="text-[15px] font-semibold text-white">
                <div className="mt-4 line-clamp-2 items-start text-balance text-lg leading-[1.3] md:mt-6">
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
              loading="lazy"
              fill={true}
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default LatestArticleCard;
