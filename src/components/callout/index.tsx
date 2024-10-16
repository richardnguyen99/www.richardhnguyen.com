import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "info" | "warning" | "danger" | "success";
  title: string;
  collapsible?: boolean;
}

const Callout: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & CalloutProps>
> = ({ type, title, collapsible = false, children, ...rest }) => {
  if (typeof title === "undefined") {
    throw new Error("Title is required for <Callout>");
  }

  if (typeof type === "undefined") {
    throw new Error("Type is required for <Callout>");
  }

  const getCalloutIcon = () => {
    switch (type) {
      case "info":
      default:
        return (
          <InfoCircledIcon className="callout-icon h-6 w-6 text-lime-500" />
        );
    }
  };

  return (
    <Accordion
      type="multiple"
      className="callout"
      defaultValue={!collapsible ? [title] : undefined}
      disabled={!collapsible}
    >
      <AccordionItem
        className={cn(
          "rounded-lg border border-b-4 border-l-4 bg-neutral-100 p-4 [--shiki-opacity:_66%] dark:border-neutral-700 dark:bg-neutral-900",
          {
            "border-lime-300 bg-lime-200/30 dark:border-lime-500 dark:bg-lime-900/30":
              type === "info",
            "border-red-300 bg-red-200/30 dark:border-red-500 dark:bg-red-900/30":
              type === "danger",
            "border-yellow-300 bg-yellow-200/30 dark:border-yellow-500 dark:bg-yellow-900/30":
              type === "warning",
            "border-green-300 bg-green-200/30 dark:border-green-500 dark:bg-green-900/30":
              type === "success",
          },
        )}
        value={title}
        {...rest}
      >
        <AccordionTrigger className="callout-title group hover:no-underline">
          <div className="flex items-center gap-2">
            {getCalloutIcon()}
            <span
              className={cn(
                "callout-title-text border-b-2 border-transparent",
                {
                  "text-lime-500 group-hover:border-lime-500": type === "info",
                  "text-red-500 group-hover:border-red-500": type === "danger",
                  "text-yellow-500 group-hover:border-yellow-500":
                    type === "warning",
                  "text-green-500 group-hover:border-green-500":
                    type === "success",
                },
              )}
            >
              {title}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="callout-content">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Callout;
