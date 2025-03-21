"use client";

import React, { type JSX } from "react";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GlossaryContext from "./context";

type Props = {
  term: string;
  children: JSX.Element;
};

export default function GlossaryItem({ term, children }: Props): JSX.Element {
  const glossaryContext = React.use(GlossaryContext);
  const definition = glossaryContext.terms[term];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="underline decoration-dotted hover:cursor-help">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent className="max-w-56">
          <span>{definition}</span>
          <TooltipArrow className="fill-primary" />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
