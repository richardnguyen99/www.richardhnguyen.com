import React, { type JSX } from "react";
import Image from "next/image";
import { useRemarkSync } from "react-remark";

import type { FrontMatter as FrontmatterType } from "@/types/mdx";
import mdxComponents from "./mdx-components";

interface FrontmatterProps {
  data: FrontmatterType;
  excerpt?: string;
}

export default function Frontmatter({
  data,
  excerpt = "",
}: FrontmatterProps): JSX.Element {
  const mdxContent = useRemarkSync(excerpt, {
    rehypeReactOptions: {
      // @ts-ignore
      components: mdxComponents,
    },
  });

  return (
    <>
      <div className="frontmatter mx-auto flex w-[var(--article-container-size)] flex-col items-center justify-center gap-8 px-[var(--article-gutter-size)]">
        <div className="text-sm sm:text-base lg:text-lg">
          {data.publishedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-center text-lg font-medium sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          {data.title}
        </div>
        {excerpt && excerpt.length > 0 && (
          <div className="line-clamp-3 text-sm md:text-base lg:line-clamp-none xl:text-lg">
            {mdxContent}
          </div>
        )}
      </div>
      <div className="mx-[var(--gutter-size)] mt-16 w-[var(--container-size)] bg-accent [&_img]:rounded-lg">
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={1470}
          height={980}
          quality={100}
          className="object-cover object-center"
          loading="lazy"
        />
      </div>
    </>
  );
}
