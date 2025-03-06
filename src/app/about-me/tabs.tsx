"use client";

import React, { type JSX } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const tabsData = [
  {
    text: "Biography",
    url: "/about-me/biography",
    key: "bio",
  },
  {
    text: "Work experience",
    url: "/about-me/experience",
    key: "exp",
  },
  {
    text: "FAQ",
    url: "/about-me/faq",
    key: "faq",
  },
];

type Props = {
  children: React.ReactNode;
  activeTab: "bio" | "exp" | "faq";
};

export default function Tabs({ children, activeTab }: Props): JSX.Element {
  const [tabBoundingBox, setTabBoundingBox] = React.useState<DOMRect | null>(
    null,
  );
  const [wrapperBoundingBox, setWrapperBoundingBox] =
    React.useState<DOMRect | null>(null);
  const [highlightedTab, setHighlightedTab] = React.useState<
    (typeof tabsData)[0] | null
  >(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = React.useState(true);

  const highlightRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const repositionHighlight = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tab: (typeof tabsData)[0],
  ) => {
    if (!wrapperRef || !wrapperRef.current) {
      return;
    }

    setTabBoundingBox((e.target as HTMLDivElement).getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles: React.CSSProperties = {};

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
  }

  return (
    <div>
      <nav
        ref={wrapperRef}
        onMouseLeave={resetHighlight}
        className="relative -mx-4 mb-4 mt-8 border-b border-border"
      >
        <div
          ref={highlightRef}
          style={highlightStyles}
          className="absolute left-0 top-[6px] h-10 transform-gpu rounded-md bg-accent transition-[width,transform,opacity] duration-75"
        />
        {tabsData.map((tab) => (
          <Link
            key={tab.key}
            href={tab.url}
            onMouseOver={(ev) => repositionHighlight(ev, tab)}
            className={cn(
              "relative mr-4 inline-block transform-gpu cursor-pointer px-4 py-3 text-lg font-semibold transition-colors",
              {
                "border-b-2 border-primary": tab.key === activeTab,
              },
            )}
          >
            {tab.text}
          </Link>
        ))}
      </nav>

      <div className="prose prose-base max-w-none dark:prose-invert xl:prose-lg">
        {children}
      </div>
    </div>
  );
}
