"use client";

import React, { type JSX } from "react";
import { ThemeProvider } from "next-themes";

import NavbarProvider from "@/components/navbar/context";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlossaryProvider from "@/components/glossary/provider";
import { GlossaryDictType } from "@/components/glossary/types";

interface GlobalProviderProps {
  children: React.ReactNode;
  glossaryDict: GlossaryDictType;
}

export default function GlobalProvider({
  glossaryDict,
  children,
}: GlobalProviderProps): JSX.Element {
  return (
    <ThemeProvider
      defaultTheme="dark"
      enableColorScheme
      enableSystem
      attribute="class"
    >
      <GlossaryProvider glossaryDict={glossaryDict}>
        <TooltipProvider delayDuration={0}>
          <NavbarProvider>{children}</NavbarProvider>
        </TooltipProvider>
      </GlossaryProvider>
    </ThemeProvider>
  );
}
