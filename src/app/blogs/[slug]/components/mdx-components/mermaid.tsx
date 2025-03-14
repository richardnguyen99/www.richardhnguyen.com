"use client";

import React, { type JSX } from "react";
import mermaid from "mermaid";

type MermaidProps = {
  children: React.ReactNode;
};

/**
 * Client component to render mermaid diagrams that are written in MDX.
 *
 * @param {MermaidProps} props - The props for the component.
 * @returns JSX.Element
 */
export default function Mermaid({ children }: MermaidProps): JSX.Element {
  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="mermaid mb-12 flex min-h-[500px] items-center justify-center [&:not([data-processed])]:invisible [&:not([data-processed])]:opacity-0">
      {children}
    </div>
  );
}
