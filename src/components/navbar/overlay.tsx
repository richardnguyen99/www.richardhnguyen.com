"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "./context";

const NavbarOverlay: React.FC = () => {
  const navbarContext = useNavbarContext();

  return (
    <div
      className={cn("fixed left-0 top-0 z-[51] hidden h-full w-full md:block", {
        "pointer-events-none": !navbarContext.isOpen,
        "opacity-0": !navbarContext.isOpen,
        "opacity-100": navbarContext.isOpen,
        "pointer-events-auto": navbarContext.isOpen,
      })}
    />
  );
};

export default NavbarOverlay;
