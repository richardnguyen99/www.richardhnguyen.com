import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import LatestArticleSection from "./components/latest-article-section";
import { DotFilledIcon } from "@radix-ui/react-icons";

const Home: React.FC = async () => {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleSection />

      <div className="overflow-hidden py-32">
        <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
          <div className="">
            <div>
              <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
                Category
              </h2>
              <h3 className="mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
                Computer Networking
              </h3>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--gutter-size)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="group relative flex aspect-[3/4] w-52 shrink-0 snap-start scroll-ml-[var(--gutter-size)] flex-col justify-end overflow-hidden rounded-xl sm:aspect-[3/4] sm:w-64 sm:rounded-xl md:w-72 md:rounded-2xl lg:w-80">
            <Link href="#">
              <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
                <div className="relative z-50 h-full w-full">
                  <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2 text-gray-200">
                    <div className="ml-4 truncate">
                      <span className="block w-[50px] max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[1.3] md:w-[unset] md:max-w-[unset]">
                        API Design
                      </span>
                    </div>
                    <DotFilledIcon className="h-2 w-2" />
                    <span className="break-none block truncate text-xs leading-[1.3]">
                      {new Date().toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="ease-curve-d absolute bottom-[1rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300">
                    <div className="text-[15px] text-white mix-blend-difference">
                      <div className="mt-4 line-clamp-2 items-start text-balance text-base font-bold leading-[1.3] md:mt-6 md:text-2xl lg:mt-12 lg:text-3xl">
                        How HTTP works
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="[&_img]:ease-curve-d [&_img]:duration-normal [&_video]:ease-curve-d [&_video]:duration-normal ease-curve-c duration-normal relative mx-auto h-full w-full max-w-[theme(maxWidth.5xl)] rounded-s transition-opacity [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-transform group-hover:[&_img]:scale-105 [&_video]:transform-gpu [&_video]:transition-transform group-hover:[&_video]:scale-105">
                <div className="relative aspect-[3/4] h-full w-full sm:aspect-[3/4]">
                  <div className="ease-curve-d duration-normal ease-curve-d relative aspect-[3/4] h-full w-full transform-gpu overflow-hidden rounded-none bg-transparent transition-[background,transform] duration-300 sm:aspect-[3/4]">
                    <Image
                      src="/thumbnails/http.png"
                      className="object-cover object-center"
                      alt="Thumbnails"
                      sizes="(min-width: 68rem) 1470px, 768px"
                      layout="fill"
                      fill={true}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-12 max-w-full md:mt-20 lg:mt-28">
        <div className="container flex items-center justify-center">
          <Link
            href="/blogs"
            className="flex w-full max-w-full items-center justify-center rounded-full bg-black px-6 py-4 text-white lg:max-w-[280px]"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
