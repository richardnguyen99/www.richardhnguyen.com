import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <Accordion
      type="multiple"
      className="callout"
      defaultValue={!collapsible ? [title] : undefined}
      disabled={!collapsible}
    >
      <AccordionItem className="border-none" value={title} {...rest}>
        <AccordionTrigger className="callout-title">{title}</AccordionTrigger>
        <AccordionContent className="callout-content">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Callout;
