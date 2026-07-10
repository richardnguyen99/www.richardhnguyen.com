"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Changelog as ChangelogType } from "../type";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExternalLink from "@/components/external-link";

type Props = {
  changelog: ChangelogType;
};

export default function Changelog({ changelog }: Props): React.JSX.Element {
  const [collapsing, setCollapsing] = React.useState(true);

  return (
    <>
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
                    "ease-curve-d max-h-[calc(100vh-300px)] w-full overflow-auto rounded-md bg-neutral-100 transition-[max-height] duration-300 xl:max-h-[calc(100vh-300px)] dark:bg-neutral-900",
                    {
                      "mb-4 h-fit": !collapsing,
                      "max-h-0 xl:max-h-0": collapsing,
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
                          className="[&_span]:text-black! dark:[&_span]:text-white!"
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
