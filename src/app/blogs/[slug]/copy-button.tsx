"use client";

import * as React from "react";
import { ClipboardIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

interface BlogCodeCopyButtonProps {
  text: string;
}

const BlogCodeCopyButton: React.FC<BlogCodeCopyButtonProps> = ({ text }) => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
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
