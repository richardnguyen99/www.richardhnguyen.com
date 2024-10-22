import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

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
      className={cn("group [&.data-footnote-backref_svg]:hidden", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {isCodeTag ? (
        <code className="transition-gpu ease-curve-d duiration-300 group transition-colors">
          <span>
            {
              (
                children as
                  | React.ReactPortal
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
              ).props.children
            }
          </span>
          <ArrowTopRightIcon className="inline-flex h-4 w-4 text-lime-500 dark:text-lime-400" />
        </code>
      ) : (
        <span
          className={cn(
            className,
            "transition-gpu ease-curve-d border-b border-transparent text-lime-500 transition-colors duration-300 hover:border-lime-500 dark:text-lime-400 dark:hover:border-lime-400",
          )}
        >
          {children}
        </span>
      )}
      {!isCodeTag && (
        <ArrowTopRightIcon className="inline-flex h-4 w-4 text-lime-500 dark:text-lime-400" />
      )}
    </a>
  );
};

export default ExternalLink;
