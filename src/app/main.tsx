"use client";

import React, { type JSX } from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const navbarContext = useNavbarContext();

  return (
    <>
      <main
        id="main"
        tabIndex={-1}
        className={cn(
          "flex flex-col items-center justify-between",
          "relative min-h-screen pb-32 outline-none",
          "origin-[50%_0px] transition-[translate,_opacity,_filter,_scale]",
          "ease-out-cubic translate-y-0 scale-[1] duration-300",
          {
            "delay-75 duration-700": !navbarContext.isOpen,
            "duration-300": navbarContext.isOpen,
            "blur-[20px] saturate-[2]": navbarContext.isOpen,
            "translate-y-[5rem] scale-[0.96]": navbarContext.isOpen,
            "overflow-hidden": navbarContext.isOpen,
          },
        )}
      >
        {children}
      </main>
    </>
  );
}
