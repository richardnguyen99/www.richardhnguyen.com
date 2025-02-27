"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { type FrontMatter } from "@/types/mdx";

type Metadata = {
  metadata: FrontMatter & { excerpt: string | null };
};

const CategoryCard = React.forwardRef<HTMLDivElement, Metadata>(
  (props, ref) => {
    const { metadata, ...rest } = props;

    return (
      <CarouselItem
        {...rest}
        ref={ref}
        className="ease-curve-a group aspect-[3/4] h-[280px] min-w-[202px] flex-[0_0_calc(210px-8xp)] transform-gpu rounded-lg pl-0 pr-4 transition duration-300 md:aspect-[3/4] md:h-[calc((((var(--document-size)_-_2rem_-_(1rem_*_2))_*_4_/_3)_/_3))] md:min-w-0 md:flex-[0_0_calc(var(--document-size)/2-8px)] lg:aspect-[4/3] lg:h-[calc((((var(--document-size)_-_2rem_-_(1rem_*_2))_*_3_/_4)_/_3))] lg:flex-[0_0_calc((1024px/2)-16px)]"
      >
        <Card className="h-full w-full">
          <Link href={`/blogs/${metadata.slug}`}>
            <CardContent className="relative h-full w-full p-0">
              <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
                <div className="relative z-50 h-full w-full">
                  <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2 text-gray-200">
                    <div className="ml-4 truncate">
                      <span className="block w-[50px] max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[1.3] md:w-[unset] md:max-w-[unset]">
                        {metadata.category}
                      </span>
                    </div>
                    <DotFilledIcon className="h-2 w-2" />
                    <span className="break-none block truncate text-xs leading-[1.3]">
                      {metadata.date.toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="ease-curve-d absolute bottom-[1rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300 group-hover:bottom-[calc(100%-6rem)] lg:group-hover:bottom-[calc(100%-8rem)]">
                    <div className="text-[15px] text-white">
                      <div className="mt-4 line-clamp-2 items-start text-balance text-base font-bold leading-[1.3] md:mt-6 md:text-2xl lg:mt-12 lg:text-3xl">
                        {metadata.title}
                      </div>
                    </div>
                  </div>

                  <div className="ease-curve-d absolute bottom-[-4rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300 group-hover:bottom-[calc(100%-11rem)] lg:group-hover:bottom-[calc(100%-13rem)]">
                    <div className="text-[15px] text-gray-200">
                      <div className="leading mt-4 line-clamp-3 items-start text-balance text-sm md:mt-6">
                        {metadata.excerpt}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&_img]:ease-curve-d [&_video]:ease-curve-d ease-curve-c relative z-[1] mx-auto h-full w-full overflow-hidden transition-opacity duration-300 [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-[transform,filter] [&_img]:duration-300 group-hover:[&_img]:scale-105 lg:group-hover:[&_img]:blur-[25px] lg:group-hover:[&_img]:drop-shadow-[0_0_120px_rgba(0,0,0,1)] [&_video]:transform-gpu [&_video]:transition-transform [&_video]:duration-300 group-hover:[&_video]:scale-105">
                <div className="relative aspect-[3/4] h-full w-full lg:aspect-[4/3]">
                  <div className="ease-curve-c absolute bottom-0 left-0 right-0 top-0 z-50 rounded-lg bg-transparent transition-colors duration-300 group-hover:bg-black/75"></div>
                  <div className="ease-curve-d relative z-[40] aspect-[3/4] h-full w-full overflow-hidden rounded-lg bg-transparent transition-[background] duration-300 lg:aspect-[4/3]">
                    <Image
                      src={metadata.thumbnail}
                      alt={metadata.title}
                      className="object-cover object-center"
                      loading="lazy"
                      fill={true}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </CarouselItem>
    );
  },
);
CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
