import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { MdxContent } from "@/types/mdx";

interface BlogCardProps extends React.HTMLAttributes<HTMLLIElement> {
  post: MdxContent;
}

export default function BlogCard({
  post,
  ...rest
}: BlogCardProps): React.JSX.Element {
  return (
    <li
      {...rest}
      className="ease-curve-c col-span-1 opacity-100 transition duration-300"
    >
      <Link
        className="ease-curve-a group relative z-0 block aspect-3/4 w-full max-w-full overflow-hidden rounded-lg rounded-s transition duration-200 md:w-[unset]"
        href={`/blogs/${post.frontMatter.slug}`}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
          <div className="relative z-50 h-full w-full">
            <div className="text-4 absolute top-4 left-0 flex w-full flex-wrap items-center gap-2 text-gray-200">
              <div className="ml-4 truncate">
                <span className="block w-full max-w-32 overflow-hidden text-xs leading-[1.3] text-ellipsis whitespace-nowrap md:w-[unset] md:max-w-[unset]">
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

            <div className="ease-curve-d absolute right-4 bottom-4 left-4 leading-snug text-balance transition-[bottom] duration-300">
              <div className="text-[15px] text-white mix-blend-difference">
                <div className="mt-4 line-clamp-2 items-start text-base leading-[1.3] font-bold text-balance md:mt-6 md:text-lg lg:mt-12 lg:text-xl">
                  {post.frontMatter.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="[&_img]:ease-curve-d [&_img]:duration-normal [&_video]:ease-curve-d [&_video]:duration-normal ease-curve-c duration-normal relative mx-auto h-full w-full max-w-5xl rounded-s transition-opacity [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-transform group-hover:[&_img]:scale-105 [&_video]:transform-gpu [&_video]:transition-transform group-hover:[&_video]:scale-105">
          <div className="relative aspect-3/4 h-full w-full sm:aspect-3/4">
            <div className="ease-curve-d duration-normal bg-accent relative aspect-3/4 h-full w-full transform-gpu overflow-hidden rounded-s transition-[background,transform] duration-300 sm:aspect-3/4">
              <Image
                src={post.frontMatter.thumbnail}
                className="object-cover object-center"
                alt="Thumbnails"
                sizes="(min-width: 68rem) 1470px, 768px"
                fill={true}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
