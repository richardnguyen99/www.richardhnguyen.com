"use client";

import React from "react";
import { Changelog as ChangelogType } from "../type";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExternalLink from "@/components/external-link";

type Props = {
  changelog: ChangelogType;
};

export default function Changelog({ changelog }: Props): React.JSX.Element {
  const [collapsing, setCollapsing] = React.useState(true);
  // return (
  //   <div className="mx-(--article-gutter-size) mt-6 w-(--article-container-size) gap-4 border-t border-neutral-500 pt-6 dark:border-neutral-700">
  //     <h4 className="text-base font-bold md:text-lg">Changelog</h4>
  //     {changelog.map((commit) => (
  //       <div key={commit.url}>
  //         <a href={commit.url} target="_blank" rel="noopener noreferrer">
  //           {commit.message}
  //         </a>
  //         <p>
  //           {commit.date ? new Date(commit.date).toLocaleString() : "No date"}
  //         </p>
  //       </div>
  //     ))}
  //   </div>

  // );
  return (
    <>
      {/* <nav
        className={cn(
          "ease-curve-d duration-normal transition-toc pointer-events-auto mx-(--article-gutter-size) mt-6 flex h-0 w-(--article-container-size) translate-y-12.5 gap-4 overflow-visible border-t border-neutral-500 pt-6 opacity-100 xl:ml-8 xl:h-fit xl:w-[calc((100%-var(--article-container-size))/2-4rem)] xl:translate-y-16.5 xl:cursor-default xl:overflow-visible xl:border-none xl:bg-transparent dark:border-neutral-700",
        )}
      > */}
      <div className="mx-(--article-gutter-size) mt-6 flex w-(--article-container-size) gap-4 border-t border-neutral-500 pt-6 dark:border-neutral-700">
        <div className="w-full">
          <div className="relative mx-(--article-gutter-size) flex w-(--article-container-size) items-start justify-between overflow-hidden rounded-md xl:mx-[unset] xl:[display:unset] xl:w-[unset]">
            <div className="w-full">
              <button
                type="button"
                onClick={() => setCollapsing((prev) => !prev)}
                className="flex w-full cursor-pointer items-center py-4 text-base font-bold transition-colors duration-200 md:text-lg"
              >
                <span className="mr-2">Changelog</span>
                {collapsing ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <div className="">
                <ScrollArea
                  className={cn(
                    "ease-curve-d max-h-[calc(100vh-300px)] w-full overflow-auto rounded-md transition-[max-height] duration-300 xl:max-h-[calc(100vh-300px)] dark:bg-neutral-900",
                    {
                      "mb-4 h-fit": collapsing,
                      "max-h-0 xl:max-h-0": !collapsing,
                    },
                  )}
                >
                  {changelog.map((change, index) => {
                    return (
                      <div
                        id={`${change.url}`}
                        key={index}
                        className={cn(
                          "line-height text mb-4 px-4 first-of-type:mt-4",
                        )}
                      >
                        <div className="text-gray-600 dark:text-gray-400">
                          <span>
                            {change.date
                              ? `[${new Date(change.date).toLocaleDateString("en-US")}] `
                              : ""}
                          </span>
                          <span>
                            {change.author ? `by ${change.author}` : ""}
                          </span>
                        </div>
                        <ExternalLink
                          href={change.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="[&_span]:text-white!"
                        >
                          {change.message}
                        </ExternalLink>
                      </div>
                    );
                  })}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
