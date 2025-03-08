import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import GlobalProvider from "./provider";
import LayoutMain from "./main";
import Navbar from "@/components/navbar";
// import NavbarOverlay from "@/components/navbar/overlay";
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

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html
      lang="en"
      className="js-focus-visible [--scroll-mt:9.875rem] [scrollbar-gutter:stable] lg:[--scroll-mt:6.3125rem]"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} h-full w-full bg-white [--gutter-size:theme(spacing.5)] dark:bg-black sm:[--container-size:calc(theme(maxWidth.xl)-theme(spacing.6))] sm:[--gutter-size:calc((100vw-(theme(maxWidth.xl)-theme(spacing.6)))/2)] md:[--container-size:calc(theme(maxWidth.3xl)-theme(spacing.6))] md:[--gutter-size:calc((100vw-(theme(maxWidth.3xl)-theme(spacing.6)))/2)] lg:[--container-size:calc(theme(maxWidth.5xl)-theme(spacing.8))] lg:[--gutter-size:calc((100vw-(theme(maxWidth.5xl)-theme(spacing.8)))/2)] xl:[--container-size:calc(theme(maxWidth.6xl)-theme(spacing.8))] xl:[--gutter-size:calc((100vw-(theme(maxWidth.6xl)-theme(spacing.8)))/2)]`}
      >
        <GlobalProvider>
          <Suspense fallback={<NavigationMenuSkeleton />}>
            <Navbar />
          </Suspense>

          <NavbarOverlay />

          <LayoutMain>{children}</LayoutMain>

          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </GlobalProvider>
        <Toaster />
      </body>
      <Script id="">0</Script>
    </html>
  );
};

export default RootLayout;
