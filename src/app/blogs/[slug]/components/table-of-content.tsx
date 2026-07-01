"use client";

import React, { type JSX } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TableOfContent(): JSX.Element {
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

    const parentElement = ref.current.parentElement;
    if (!parentElement) return;

    let headingObserver: IntersectionObserver | null = null;
    let contentObserver: IntersectionObserver | null = null;
    let contentMutationObserver: MutationObserver | null = null;
    let parentMutationObserver: MutationObserver | null = null;
    let rafId: number | null = null;

    // (Re)attach the heading intersection observer to whatever headings
    // currently exist. Called every time the content subtree mutates.
    const observeHeadings = (headingEls: HTMLElement[]) => {
      headingObserver?.disconnect();

      headingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;

            const tocItem = Array.from(
              document.querySelectorAll(`#toc-${id}`),
            ).at(-1);

            if (!tocItem) return;

            if (entry.isIntersecting) {
              const currentActiveElements = Array.from(
                document.querySelectorAll(
                  `[data-current-active-tab-content-item="true"]`,
                ),
              );

              for (const el of currentActiveElements) {
                el.classList.remove("active");
                el.removeAttribute("data-current-active-tab-content-item");
              }

              tocItem.setAttribute(
                "data-current-active-tab-content-item",
                "true",
              );

              setActiveHeading(entry.target as HTMLElement);
            }
          });
        },
        {
          // This will make sure the intersecting is triggered if and only if
          // the header appears 66% on viewport, i.e. the content is 66% visible.
          // 96px is for auto scroll margin.
          rootMargin: "-96px 0px -66% 0px",
          threshold: 1,
        },
      );

      headingEls.forEach((heading) => headingObserver!.observe(heading));
    };

    const scanHeadings = (content: Element) => {
      const headingEls = Array.from(
        content.querySelectorAll<HTMLElement>("h1, h2"),
      );
      setHeadings(headingEls);
      observeHeadings(headingEls);
    };

    const setupContentViewportObserver = (content: Element) => {
      contentObserver = new IntersectionObserver(
        ([entry]) => {
          setInViewport(entry.isIntersecting);
          if (entry.isIntersecting) {
            setCollapsing(extraLarge);
          }
        },
        {
          // Same rationale as above.
          rootMargin: "-96px 0px -66% 0px",
        },
      );

      contentObserver.observe(content);
    };

    const attachToContent = (content: Element) => {
      // Initial scan, in case headings already exist.
      scanHeadings(content);
      setupContentViewportObserver(content);

      // Content (e.g. streamed/Suspense-resolved blog body, async MDX,
      // client-rendered markdown) can mount its headings *after* this
      // effect has already run. Keep watching and re-scan whenever the
      // subtree changes, debounced to one scan per frame.
      contentMutationObserver = new MutationObserver(() => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => scanHeadings(content));
      });

      contentMutationObserver.observe(content, {
        childList: true,
        subtree: true,
      });
    };

    const existingContent = parentElement.querySelector(".content");

    if (existingContent) {
      attachToContent(existingContent);
    } else {
      // `.content` itself hasn't mounted yet — wait for it to appear,
      // then start watching it as above.
      parentMutationObserver = new MutationObserver(() => {
        const content = parentElement.querySelector(".content");
        if (content) {
          parentMutationObserver?.disconnect();
          parentMutationObserver = null;
          attachToContent(content);
        }
      });

      parentMutationObserver.observe(parentElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      headingObserver?.disconnect();
      contentObserver?.disconnect();
      contentMutationObserver?.disconnect();
      parentMutationObserver?.disconnect();
    };
  }, [extraLarge]);

  return (
    <>
      <nav
        ref={ref}
        className={cn(
          "ease-curve-d duration-normal transition-toc sticky top-0 z-50 h-0 w-full translate-y-12.5 overflow-visible opacity-100 xl:ml-8 xl:w-[calc((100%-var(--article-container-size))/2-4rem)] xl:translate-y-16.5 xl:cursor-default xl:overflow-visible xl:border-none xl:bg-transparent",
          {
            "pointer-events-none opacity-0 xl:h-0": !inViewport,
            "pointer-events-auto opacity-100 xl:h-fit": inViewport,
          },
        )}
      >
        <div className="bg-white/80 backdrop-blur xl:rounded-md xl:border-transparent xl:bg-transparent xl:px-6 dark:bg-black/80">
          <div className="relative mx-(--article-gutter-size) flex w-(--article-container-size) items-start justify-between overflow-hidden rounded-md xl:mx-[unset] xl:[display:unset] xl:w-[unset]">
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
                    "ease-curve-d max-h-[calc(100vh-300px)] w-full overflow-auto transition-[max-height] duration-300 xl:max-h-[calc(100vh-300px)]",
                    {
                      "mb-4 h-fit": collapsing,
                      "max-h-0 xl:max-h-0": !collapsing,
                    },
                  )}
                >
                  {headings.map((heading, index) => {
                    const id = heading.getAttribute("id");
                    const text = Array.from(
                      heading.childNodes.entries(),
                    ).reduce((acc, [_, node]) => {
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
                          "line-height mb-2 line-clamp-1 cursor-pointer gap-2 text-sm text-slate-400 hover:text-slate-600 data-current-active-tab-content-item:text-black dark:text-neutral-700 dark:hover:text-neutral-500 dark:data-current-active-tab-content-item:text-white",
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
          "ease-curve-d fixed top-0 left-0 z-49 h-full w-full bg-white/80 transition-opacity duration-300 xl:hidden dark:bg-black/80",
          {
            "pointer-events-auto opacity-100": collapsing,
            "pointer-events-none opacity-0": !collapsing,
          },
        )}
      ></div>
    </>
  );
}
