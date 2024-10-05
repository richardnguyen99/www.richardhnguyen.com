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
      className={cn("group flex items-center", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span className="transition-gpu ease-curve-d border-b border-transparent transition-colors duration-300 hover:border-neutral-900 hover:text-foreground dark:hover:border-neutral-100">
        {children}
      </span>
      <ArrowTopRightIcon className="h-4 w-4" />
    </a>
  );
};

export default ExternalLink;
