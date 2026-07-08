"use client";

import React from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const ExternalLink: React.FC<React.ComponentPropsWithoutRef<"a">> = ({
  className,
  children,
  ...props
}) => {
  const isCodeTag = React.useMemo(() => {
    return (
      React.isValidElement(children) &&
      children.type === "code" &&
      children.props
    );
  }, [children]);

  return (
    <a
      className={cn(
        "group inline-flex items-center justify-between [&.data-footnote-backref_svg]:hidden",
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {isCodeTag ? (
        <code className="transition-gpu ease-curve-d group line-clamp-1 flex-1 transition-colors duration-300">
          <span>
            {
              (
                children as React.ReactElement<{
                  children: React.ReactNode;
                }>
              ).props.children
            }
          </span>
          <ArrowTopRightIcon className="h-4 w-4 shrink-0 text-lime-500 dark:text-lime-400" />
        </code>
      ) : (
        <span
          className={cn(
            "transition-gpu ease-curve-d line-clamp-1 flex-1 border-b border-transparent text-lime-500 transition-colors duration-300 hover:border-lime-500 dark:text-lime-400 dark:hover:border-lime-400",
          )}
        >
          {children}
        </span>
      )}
      {!isCodeTag && (
        <ArrowTopRightIcon className="h-4 w-4 shrink-0 text-lime-500 dark:text-lime-400" />
      )}
    </a>
  );
};

export default ExternalLink;
