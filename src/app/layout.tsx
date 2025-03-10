import React, { type JSX } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import GlobalProvider from "./provider";
import LayoutMain from "./main";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import NavbarOverlay from "@/components/navbar/overlay";
import NavigationMenuSkeleton from "@/components/navbar/navbar-menu-skeleton";
import { sharedMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...sharedMetadata,
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    colorScheme: "dark light",
  };
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html
      lang="en"
      className="js-focus-visible [--scroll-mt:9.875rem] [scrollbar-gutter:stable] lg:[--scroll-mt:6.3125rem]"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} h-full w-full bg-white [--gutter-size:theme(spacing.5)] sm:[--container-size:calc(theme(maxWidth.xl)-theme(spacing.6))] sm:[--gutter-size:calc((100vw-(theme(maxWidth.xl)-theme(spacing.6)))/2)] md:[--container-size:calc(theme(maxWidth.3xl)-theme(spacing.6))] md:[--gutter-size:calc((100vw-(theme(maxWidth.3xl)-theme(spacing.6)))/2)] lg:[--container-size:calc(theme(maxWidth.5xl)-theme(spacing.8))] lg:[--gutter-size:calc((100vw-(theme(maxWidth.5xl)-theme(spacing.8)))/2)] xl:[--container-size:calc(theme(maxWidth.6xl)-theme(spacing.8))] xl:[--gutter-size:calc((100vw-(theme(maxWidth.6xl)-theme(spacing.8)))/2)] dark:bg-black`}
      >
        <GlobalProvider>
          <React.Suspense fallback={<NavigationMenuSkeleton />}>
            <Navbar />
          </React.Suspense>

          <NavbarOverlay />

          <LayoutMain>{children}</LayoutMain>

          <React.Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </React.Suspense>
        </GlobalProvider>

        <Toaster />
      </body>
    </html>
  );
}
