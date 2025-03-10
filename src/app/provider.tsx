"use client";

import React, { type JSX } from "react";
import { ThemeProvider } from "next-themes";

import NavbarProvider from "@/components/navbar/context";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider
      defaultTheme="dark"
      enableColorScheme
      enableSystem
      attribute="class"
    >
      <TooltipProvider delayDuration={0}>
        <NavbarProvider>{children}</NavbarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
