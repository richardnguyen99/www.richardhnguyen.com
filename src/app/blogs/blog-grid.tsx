"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { MdxContent } from "@/lib/mdx";

interface BlogGridProps {
  posts: MdxContent[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    <ul className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <li
          key={i}
          className="ease-curve-c col-span-1 opacity-100 transition duration-300"
        >
          <Link
            className="ease-curve-a group relative z-0 block aspect-[3/4] w-full max-w-full overflow-hidden rounded-lg rounded-s bg-gray-200 transition duration-200 md:w-[unset]"
            href={`/blogs/${post.frontMatter.slug}`}
          >
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
              <div className="relative z-50 h-full w-full">
                <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2 text-gray-200">
                  <div className="ml-4 truncate">
                    <span className="block w-full max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[1.3] md:w-[unset] md:max-w-[unset]">
                      {post.frontMatter.category}
                    </span>
                  </div>
                  <DotFilledIcon className="h-2 w-2" />
                  <span className="break-none block truncate text-xs leading-[1.3]">
                    {new Date(post.frontMatter.publishedAt).toLocaleDateString(
                      "en-us",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
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
                <div className="ease-curve-d duration-normal ease-curve-d relative aspect-[3/4] h-full w-full transform-gpu overflow-hidden rounded-s bg-transparent transition-[background,transform] duration-300 sm:aspect-[3/4]">
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
  );
};

export default BlogGrid;
