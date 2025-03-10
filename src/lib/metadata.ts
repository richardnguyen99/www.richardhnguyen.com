import { type Metadata } from "next";

export const sharedMetadata: Metadata = {
  title: {
    template: "%s | Richard H. Nguyen",
    default: "Home | Richard H. Nguyen",
  },
  description: "Personal blog of Richard H. Nguyen",
  metadataBase: new URL("https://www.richardhnguyen.com"),
  twitter: {
    site: "@richardhnguyen",
    creator: "@richardhnguyen",
    card: "summary_large_image",
    title: {
      default: "Home | Richard H. Nguyen",
      template: "%s | Richard H. Nguyen",
    },
    description: "Personal blog of Richard H. Nguyen",
    images: [
      {
        url: "/twitter-card.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Blog's Twitter Card",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NODE_ENV === "production" ? "/" : undefined,
    siteName: "richardhnguyen.com",
    title: {
      default: "Home | Richard H. Nguyen",
      template: "%s | Richard H. Nguyen",
    },
    images: [
      {
        url: "/twitter-card.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Blog's OG Image",
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
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
