"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

interface FooterProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

const Footer: React.FC<FooterProps> = ({ children, className, ...rest }) => {
  // const navbarContext = useNavbarContext();

  return (
    <footer
      {...rest}
      className={cn(
        "bg-black text-white",
        "border-t border-transparent dark:border-neutral-700",
        "origin-[50%_0px] transition-[transform,_opacity,_filter]",
        "ease-out-cubic overflow-hidden duration-300",
        className,
      )}
    >
      {children}
    </footer>
  );
};

export default Footer;
