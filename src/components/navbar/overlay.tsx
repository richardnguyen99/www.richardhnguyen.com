"use client";

import React, { type JSX } from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "./context";

export default function NavbarOverlay(): JSX.Element {
  const navbarContext = useNavbarContext();

  return (
    <div
      className={cn("fixed top-0 left-0 z-[51] h-full w-full", {
        "pointer-events-none": !navbarContext.isOpen,
        "opacity-0": !navbarContext.isOpen,
        "opacity-100": navbarContext.isOpen,
        "pointer-events-auto": navbarContext.isOpen,
        hidden: !navbarContext.isOpen,
        "md:block": navbarContext.isOpen,
      })}
    />
  );
}
