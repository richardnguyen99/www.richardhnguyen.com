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
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Richard H. Nguyen",
    default: "Home | Richard H. Nguyen",
  },
  description: "Personal blog of Richard H. Nguyen",
  metadataBase: new URL(process.env.METADATA_BASE),
  twitter: {
    site: "@richardhnguyen",
    creator: "@richardhnguyen",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.richardhnguyen.com",
    siteName: "Richard H. Nguyen",
    title: "Personal blog of Richard H. Nguyen",
    images: [
      {
        url: "https://next.richardhnguyen.com/Logo16.png",
        width: 16,
        height: 16,
        alt: "Logo 16x16",
      },
      {
        url: "https://next.richardhnguyen.com/Logo32.png",
        width: 32,
        height: 32,
        alt: "Logo 32x32",
        type: "image/png",
      },
      {
        url: "https://next.richardhnguyen.com/Logo48.png",
        width: 48,
        height: 48,
        alt: "Logo 48x48",
        type: "image/png",
      },
      {
        url: "https://next.richardhnguyen.com/Logo64.png",
        width: 64,
        height: 64,
        alt: "Logo 64x64",
        type: "image/png",
      },
      {
        url: "https://next.richardhnguyen.com/Logo128.png",
        width: 128,
        height: 128,
        alt: "Logo 128x128",
        type: "image/png",
      },
      {
        url: "https://next.richardhnguyen.com/Logo256.png",
        width: 256,
        height: 256,
        alt: "Logo 256x256",
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "/Logo128.png",
    shortcut: "/Logo16.png",
    apple: "/Logo256.png",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
