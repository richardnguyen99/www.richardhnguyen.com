"use client";

import React, { type JSX } from "react";
import { CheckIcon, CopyIcon } from "@primer/octicons-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CopyButtonProps = {
  content: string;
};

type Props = React.HTMLAttributes<HTMLButtonElement> & CopyButtonProps;

export default function CopyButton({ content, ...rest }: Props): JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const copyTextToClipboard = async (text: string) => {
    return await navigator.clipboard.writeText(text);
  };

  const handleCopyClick = React.useCallback(() => {
    if (isCopied) return;

    copyTextToClipboard(content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        throw Error(err);
      });
  }, [content, isCopied]);

  return (
    <Tooltip open={isHovered}>
      <TooltipTrigger asChild>
        <button
          {...rest}
          aria-describedby="code-copy-button"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-700",
            {
              "relative h-8 w-8": true,
              "flex items-center justify-center": true,
              show: isCopied,
            },
          )}
          onClick={handleCopyClick}
        >
          <CopyIcon
            size={16}
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 transition-all duration-500 ease-in-out group-[:not(.show)]:scale-100 group-[:not(.show)]:opacity-100"
          />

          <CheckIcon
            size={16}
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 scale-50 fill-green-500 opacity-0 transition-all duration-500 ease-in-out group-[.show]:scale-100 group-[.show]:opacity-100"
          />
        </button>
      </TooltipTrigger>

      <TooltipContent
        side="left"
        className="border border-neutral-300 bg-neutral-200 text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
      >
        {isCopied ? "Copied!" : "Copy"}
      </TooltipContent>
    </Tooltip>
  );
}
