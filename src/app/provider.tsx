"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

import NavbarProvider from "@/components/navbar/context";
import { TooltipProvider } from "@/components/ui/tooltip";

const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
      <TooltipProvider delayDuration={0}>
        <NavbarProvider>{children}</NavbarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
