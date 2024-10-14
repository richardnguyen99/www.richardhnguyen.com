"use client";

import * as React from "react";
import { ClipboardIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const BlogCodeCopyButton: React.FC = () => {
  return (
    <Button
      className={cn(
        buttonVariants({
          className: "copy-button",
          variant: "outline",
          size: "sm",
        }),
        "border-0",
      )}
    >
      <ClipboardIcon />
    </Button>
  );
};

export default BlogCodeCopyButton;
