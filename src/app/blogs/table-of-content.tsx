"use client";

import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";

const TableOfContent: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const extraLarge = useMediaQuery("(min-width: 1280px)");
  const [headings, setHeadings] = React.useState<HTMLElement[]>([]);
  const [activeHeading, setActiveHeading] = React.useState<HTMLElement | null>(
    null,
  );
  const [collapsing, setCollapsing] = React.useState(extraLarge);
  const [inViewport, setInViewport] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const parentElement = ref.current.parentElement as HTMLElement;

    if (!parent) return;

    const content = parentElement.querySelector(".content");

    if (!content) return;

    // Query all heading 1 and 2
    setHeadings(Array.from(content.querySelectorAll("h1, h2")));

    // Check if content is in viewport
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setCollapsing(extraLarge);
        }
      },
      {
        // This will make sure the intersectioning is triggered if and only if
        // the header appears 90% on viewport, i.e. the content is 90% visible
        rootMargin: "0px 0px -90% 0px",
      },
    );

    contentObserver.observe(content);

    return () => {
      contentObserver.unobserve(content);
    };
  }, [extraLarge]);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          "ease-curve-d duration-normal sticky top-0 z-50 h-0 w-full translate-y-[50px] overflow-visible opacity-100 transition-toc xl:ml-8 xl:h-fit xl:w-[calc((100%-var(--article-container-size))/2-4rem)] xl:translate-y-[66px] xl:cursor-default xl:overflow-visible xl:border-none xl:bg-transparent",
          {
            "pointer-events-none opacity-0": !inViewport,
            "pointer-events-auto opacity-100": inViewport,
          },
        )}
      >
        <div className="bg-white/90 backdrop-blur dark:bg-black/80 xl:rounded-md xl:border-transparent xl:bg-transparent xl:px-6">
          <div className="relative mx-[var(--article-gutter-size)] flex w-[var(--article-container-size)] items-start justify-between overflow-hidden rounded-md xl:mx-[unset] xl:w-[unset] xl:[display:unset]">
            <div className="w-full">
              <button
                type="button"
                onClick={() => setCollapsing((prev) => !prev)}
                className="flex w-full items-center justify-between py-4 text-sm font-medium transition-colors duration-200"
              >
                <span>Table of Content</span>
                {collapsing ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <div className="">
                <ScrollArea
                  className={cn(
                    "ease-curve-d max-h-[calc(100vh-50px)] w-full transition-[max-height] duration-300 xl:max-h-[calc(100vh-82px)]",
                    {
                      "mb-4 h-fit": collapsing,
                      "max-h-0 xl:max-h-0": !collapsing,
                    },
                  )}
                >
                  {headings.map((heading, index) => {
                    const text = heading.childNodes[0].textContent;
                    const id = heading.getAttribute("id");

                    if (!text || !id) return null;

                    return (
                      <div
                        key={index}
                        onClick={() => setCollapsing(false)}
                        className="line-height mb-2 line-clamp-1 cursor-pointer gap-2 text-sm dark:text-neutral-700 dark:hover:text-neutral-500 dark:active:text-neutral-300"
                      >
                        <a href={`#${id}`}>{text}</a>
                      </div>
                    );
                  })}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        onClick={() => setCollapsing(false)}
        className={cn(
          "ease-curve-d fixed left-0 top-0 z-[49] h-full w-full bg-black/80 transition-opacity duration-300 xl:hidden",
          {
            "pointer-events-auto opacity-100": collapsing,
            "pointer-events-none opacity-0": !collapsing,
          },
        )}
      ></div>
    </>
  );
};

export default TableOfContent;
