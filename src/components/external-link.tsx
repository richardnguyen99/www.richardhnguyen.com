import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const ExternalLink: React.FC<React.ComponentPropsWithoutRef<"a">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={cn("group [&.data-footnote-backref_svg]:hidden", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span
        className={cn(
          className,
          "transition-gpu ease-curve-d border-b border-transparent text-lime-500 transition-colors duration-300 hover:border-lime-500 dark:text-lime-400 dark:hover:border-lime-400",
        )}
      >
        {children}
      </span>
      <ArrowTopRightIcon className="inline-flex h-4 w-4 text-lime-500 dark:text-lime-400" />
    </a>
  );
};

export default ExternalLink;
