"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

const LayoutMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navbarContext = useNavbarContext();

  return (
    <>
      <main
        id="main"
        tabIndex={-1}
        className={cn(
          "flex flex-col items-center justify-between",
          "relative min-h-screen pb-32 pt-[66px] outline-none",
          "origin-[50%_0px] transition-[transform,_opacity,_filter]",
          "ease-out-cubic duration-300",
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
};

export default LayoutMain;
