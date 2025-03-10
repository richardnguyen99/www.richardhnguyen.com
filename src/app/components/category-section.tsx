import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { getMdxContents } from "@/lib/mdx";
import { cn } from "@/lib/utils";

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
  const data = await getMdxContents({
    limit: 5,
    sortOrder: "desc",
    filter: (content) => content.frontMatter.category === category,
  });

  return (
    <section
      {...rest}
      id={`${category}-section`}
      className={cn("overflow-hidden pt-32", className)}
    >
      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
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

      <ul className="mx-auto mt-16 flex snap-x snap-mandatory gap-10 overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--gutter-size)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {data.map((post, i) => (
          <li
            key={`${i}`}
            data-slice-index={i}
            className="group relative flex aspect-[3/4] w-52 shrink-0 snap-start scroll-ml-[var(--gutter-size)] flex-col justify-end overflow-hidden rounded-xl sm:aspect-[3/4] sm:w-64 sm:rounded-xl md:w-72 md:rounded-2xl lg:w-80"
          >
            <Link href={`/blogs/${post.frontMatter.slug}`}>
              <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
                <div className="relative z-50 h-full w-full">
                  <div className="text-4 absolute top-[1rem] left-0 flex w-full flex-wrap items-center gap-2 text-gray-200">
                    <div className="ml-4 truncate">
                      <span className="block w-[50px] max-w-[50px] overflow-hidden text-xs leading-[1.3] text-ellipsis whitespace-nowrap md:w-[unset] md:max-w-[unset]">
                        {post.frontMatter.category}
                      </span>
                    </div>
                    <DotFilledIcon className="h-2 w-2" />
                    <span className="break-none block truncate text-xs leading-[1.3]">
                      {new Date(
                        post.frontMatter.publishedAt,
                      ).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="ease-curve-d absolute right-[1rem] bottom-[1rem] left-[1rem] leading-snug text-balance transition-[bottom] duration-300">
                    <div className="text-[15px] text-white mix-blend-difference">
                      <div className="mt-4 line-clamp-2 items-start text-base leading-[1.3] font-bold text-balance md:mt-6 md:text-lg lg:mt-12 lg:text-xl">
                        {post.frontMatter.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&_img]:ease-curve-d [&_img]:duration-normal [&_video]:ease-curve-d [&_video]:duration-normal ease-curve-c duration-normal relative mx-auto h-full w-full max-w-[theme(maxWidth.5xl)] rounded-s transition-opacity [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-transform group-hover:[&_img]:scale-105 [&_video]:transform-gpu [&_video]:transition-transform group-hover:[&_video]:scale-105">
                <div className="relative aspect-[3/4] h-full w-full sm:aspect-[3/4]">
                  <div className="duration-normal ease-curve-d bg-accent relative aspect-[3/4] h-full w-full transform-gpu overflow-hidden rounded-none transition-[background,transform] duration-300 sm:aspect-[3/4]">
                    <Image
                      src={post.frontMatter.thumbnail}
                      className="object-cover object-center"
                      alt="Thumbnails"
                      sizes="(min-width: 68rem) 1470px, 768px"
                      fill={true}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
