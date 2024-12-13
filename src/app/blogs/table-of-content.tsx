"use client";

import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        // the header appears 66% on viewport, i.e. the content is 66% visible.
        // 96px is for auto scroll margin.
        rootMargin: "-96px 0px -66% 0px",
      },
    );

    contentObserver.observe(content);

    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          // Get the corresponding toc item from the heading id
          const tocItem = Array.from(
            document.querySelectorAll(`#toc-${id}`),
          ).at(-1);

          if (!tocItem) return;

          if (entry.isIntersecting) {
            // Find all the current active elements.
            const currentActiveElements = Array.from(
              document.querySelectorAll(
                `[data-current-active-tab-content-item="true"]`,
              ),
            );

            // remove the active class and attributes
            if (currentActiveElements.length) {
              // loop through all elements and remove class and attr
              for (const el of currentActiveElements) {
                el.classList.remove("active");
                el.removeAttribute("data-current-active-tab-content-item");
              }
            }

            // Add active class and attributes
            tocItem.setAttribute(
              "data-current-active-tab-content-item",
              "true",
            );

            // Reusable active class
            setActiveHeading(entry.target as HTMLElement);
          }
        });
      },
      {
        // See above for explanation
        rootMargin: "-96px 0px -66% 0px",
        threshold: 1,
      },
    );

    content.querySelectorAll("h1, h2").forEach((heading) => {
      headingObserver.observe(heading);
    });

    return () => {
      contentObserver.unobserve(content);

      content.querySelectorAll("h1, h2").forEach((heading) => {
        headingObserver.unobserve(heading);
      });
    };
  }, [extraLarge]);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          "ease-curve-d duration-normal sticky top-0 z-50 h-0 w-full translate-y-[50px] overflow-visible opacity-100 transition-toc xl:ml-8 xl:w-[calc((100%-var(--article-container-size))/2-4rem)] xl:translate-y-[66px] xl:cursor-default xl:overflow-visible xl:border-none xl:bg-transparent",
          {
            "pointer-events-none opacity-0 xl:h-0": !inViewport,
            "pointer-events-auto opacity-100 xl:h-fit": inViewport,
          },
        )}
      >
        <div className="bg-white/80 backdrop-blur dark:bg-black/80 xl:rounded-md xl:border-transparent xl:bg-transparent xl:px-6">
          <div className="relative mx-[var(--article-gutter-size)] flex w-[var(--article-container-size)] items-start justify-between overflow-hidden rounded-md xl:mx-[unset] xl:w-[unset] xl:[display:unset]">
            <div className="w-full">
              <button
                type="button"
                onClick={() => setCollapsing((prev) => !prev)}
                className="flex w-full items-center justify-between py-4 text-sm font-medium transition-colors duration-200"
              >
                <span>
                  {extraLarge
                    ? "Table of Content"
                    : collapsing
                      ? "Table of Content"
                      : activeHeading?.childNodes[0].textContent}
                </span>
                {collapsing ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <div className="">
                <ScrollArea
                  className={cn(
                    "ease-curve-d max-h-[calc(100vh-50px)] w-full transition-[max-height] duration-300 xl:max-h-[calc(100vh-114px)]",
                    {
                      "mb-4 h-fit": collapsing,
                      "max-h-0 xl:max-h-0": !collapsing,
                    },
                  )}
                >
                  {headings.map((heading, index) => {
                    const id = heading.getAttribute("id");
                    const text = heading.childNodes
                      .entries()
                      .reduce((acc, [_, node]) => {
                        if (node.textContent === "#") return acc;

                        return acc + node.textContent;
                      }, "");

                    if (!text || !id) return null;

                    return (
                      <div
                        id={`toc-${id}`}
                        key={index}
                        onClick={() => {
                          if (!extraLarge) {
                            setCollapsing(false);
                          }
                        }}
                        className={cn(
                          "line-height mb-2 line-clamp-1 cursor-pointer gap-2 text-sm text-slate-400 hover:text-slate-600 data-[current-active-tab-content-item]:text-black dark:text-neutral-700 dark:hover:text-neutral-500 dark:data-[current-active-tab-content-item]:text-white",
                          {
                            "pl-4": heading.tagName === "H2",
                          },
                        )}
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
          "ease-curve-d fixed left-0 top-0 z-[49] h-full w-full bg-white/80 transition-opacity duration-300 dark:bg-black/80 xl:hidden",
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
