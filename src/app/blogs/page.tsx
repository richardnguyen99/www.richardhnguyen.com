import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DotFilledIcon,
  LineHeightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { getMdxContents } from "@/lib/mdx";

const Blog: React.FC = async () => {
  const posts = await getMdxContents();

  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <div className="flex w-full justify-between gap-4">
        <div className="flex w-full flex-col">
          <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
            {posts.length} articles
          </h2>
          <div className="flex w-full items-center justify-between">
            <h3 className="mt-2 text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-2xl">
              Latest Blog
            </h3>
            <div className="flex items-center gap-4">
              <Button className="ease-curve-d group flex transform-gpu items-center gap-3 rounded-full bg-gray-100/0 text-gray-950 shadow-none duration-200 hover:bg-gray-100">
                <span>Filter</span>
                <MixerHorizontalIcon className="h-4 w-4" />
              </Button>

              <Button className="ease-curve-d group flex transform-gpu items-center gap-3 rounded-full bg-gray-100/0 text-gray-950 shadow-none duration-200 hover:bg-gray-100">
                <span>Sort</span>
                <LineHeightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ul className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <li
            key={i}
            className="ease-curve-c col-span-1 opacity-100 transition duration-300"
          >
            <Link
              className="ease-curve-a group relative z-0 block aspect-[3/4] w-full max-w-full overflow-hidden rounded-lg bg-gray-200 transition duration-200 md:w-[unset]"
              href={`/blogs/${post.frontMatter.slug}`}
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
                <div className="relative z-50 h-full w-full">
                  <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2 text-gray-200">
                    <div className="ml-4 truncate">
                      <span className="block w-[50px] max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[1.3] md:w-[unset] md:max-w-[unset]">
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

                  <div className="ease-curve-d absolute bottom-[1rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300">
                    <div className="text-[15px] text-white mix-blend-difference">
                      <div className="mt-4 line-clamp-2 items-start text-balance text-base font-bold leading-[1.3] md:mt-6 md:text-lg lg:mt-12 lg:text-xl">
                        {post.frontMatter.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&_img]:ease-curve-d [&_img]:duration-normal [&_video]:ease-curve-d [&_video]:duration-normal ease-curve-c duration-normal relative mx-auto h-full w-full max-w-[theme(maxWidth.5xl)] rounded-s transition-opacity [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-transform group-hover:[&_img]:scale-105 [&_video]:transform-gpu [&_video]:transition-transform group-hover:[&_video]:scale-105">
                <div className="relative aspect-[3/4] h-full w-full sm:aspect-[3/4]">
                  <div className="ease-curve-d duration-normal ease-curve-d relative aspect-[3/4] h-full w-full transform-gpu overflow-hidden rounded-none bg-transparent transition-[background,transform] duration-300 sm:aspect-[3/4]">
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
    </div>
  );
};

export default Blog;
