"use client";

import React, { type JSX } from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

interface FooterProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

export default function FooterWrapper({
  children,
  className,
  ...rest
}: FooterProps): JSX.Element {
  const navbarContext = useNavbarContext();

  return (
    <footer
      {...rest}
      className={cn(
        "bg-black text-white",
        "border-t border-transparent dark:border-neutral-700",
        "origin-[50%_0px] transition-[translate,_scale,_transform,_opacity,_filter]",
        "ease-out-cubic overflow-hidden duration-300",
        {
          "delay-75 duration-700": !navbarContext.isOpen,
          "duration-300": navbarContext.isOpen,
          "blur-[50px] saturate-[2]": navbarContext.isOpen,
          "translate-y-[5rem] scale-[0.96]": navbarContext.isOpen,
          "translate-y-0 scale-100": !navbarContext.isOpen,
          "overflow-hidden": navbarContext.isOpen,
        },
        className,
      )}
    >
      {children}
    </footer>
  );
}
