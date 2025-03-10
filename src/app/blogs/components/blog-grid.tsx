import React, { type JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { type MdxContent } from "@/types/mdx";
import { NUM_POST_PER_PAGE } from "../lib/constant";

interface BlogGridProps {
  posts: MdxContent[];
  currentPage: number;
}

export default function BlogGrid({
  posts,
  currentPage,
}: BlogGridProps): JSX.Element {
  const pageStart = (currentPage - 1) * NUM_POST_PER_PAGE;
  const pageEnd = currentPage * NUM_POST_PER_PAGE;

  const postsToShow = posts.slice(pageStart, pageEnd);

  return (
    <ul className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {postsToShow.length > 0 ? (
        postsToShow.map((post, i) => (
          <li
            key={i}
            className="ease-curve-c col-span-1 opacity-100 transition duration-300"
          >
            <Link
              className="ease-curve-a group relative z-0 block aspect-[3/4] w-full max-w-full overflow-hidden rounded-lg rounded-s transition duration-200 md:w-[unset]"
              href={`/blogs/${post.frontMatter.slug}`}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
                <div className="relative z-50 h-full w-full">
                  <div className="text-4 absolute top-[1rem] left-0 flex w-full flex-wrap items-center gap-2 text-gray-200">
                    <div className="ml-4 truncate">
                      <span className="block w-full max-w-[128px] overflow-hidden text-xs leading-[1.3] text-ellipsis whitespace-nowrap md:w-[unset] md:max-w-[unset]">
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
                  <div className="ease-curve-d duration-normal bg-accent relative aspect-[3/4] h-full w-full transform-gpu overflow-hidden rounded-s transition-[background,transform] duration-300 sm:aspect-[3/4]">
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
        ))
      ) : (
        <li className="relative z-0 col-span-3 flex min-h-[500px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-400 to-purple-800">
          <div className="to-violet-500-500 absolute -top-[10%] right-0 bottom-0 -left-[15%] z-10 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-indigo-400 opacity-100" />
          <div className="absolute -top-[calc(8%)] right-0 bottom-0 -left-[calc(13%)] z-[9] h-[320px] w-[320px] rounded-full border-[5px] border-indigo-400 bg-transparent opacity-100" />
          <div className="absolute -right-[5%] -bottom-[5%] z-[8] h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-indigo-400 to-purple-800 opacity-100" />
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute z-[9] h-[4px] w-[4px] rounded-full bg-indigo-200"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          <h2 className="z-50 text-4xl font-black text-white">
            Wow, so empty...
          </h2>
        </li>
      )}
    </ul>
  );
}
