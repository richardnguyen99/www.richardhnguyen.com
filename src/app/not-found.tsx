"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import ExternalLink from "@/components/external-link";

export default function NotFoundBlogPost() {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "z-10 w-full max-w-5xl",
          "items-center justify-between lg:flex",
          "font-mono text-sm",
        )}
      ></div>

      <div>
        <h1 className="text-6xl font-black">Oops. Not Found</h1>
        <h3 className="mt-4 text-2xl font-bold">
          Sorry, but the following path does not exist:{" "}
          <code className="text-lime-400 dark:text-lime-500">{pathname}</code>
        </h3>
        <p className="mt-4">
          If you believe this is a mistake, please{" "}
          <ExternalLink href="https://github.com/richardnguyen99/next.richardhnguyen.com/issues/new">
            open an issue on GitHub
          </ExternalLink>
          .
        </p>
      </div>

      <div
        className={cn(
          "mb-32 lg:mb-0",
          "grid lg:w-full lg:max-w-5xl lg:grid-cols-4",
          "text-center lg:text-left",
        )}
      >
        <Link
          href="/blogs"
          className={cn(
            "group rounded-lg",
            "border border-transparent",
            "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
            "px-5 py-4 transition-colors",
          )}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Blogs
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            What I have written
          </p>
        </Link>

        <Link
          href="/projects"
          className={cn(
            "group rounded-lg",
            "border border-transparent",
            "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
            "px-5 py-4 transition-colors",
          )}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Projects
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore projects I have worked on
          </p>
        </Link>

        <Link
          href="/gist"
          className={cn(
            "group rounded-lg",
            "border border-transparent",
            "px-5 py-4 transition-colors",
            "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
          )}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Gist
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Small stuff I have programmed
          </p>
        </Link>

        <a
          href="https://github.com/richardnguyen99/next.richardhnguyen.com"
          className={cn(
            "group rounded-lg",
            "border border-transparent",
            "px-5 py-4 transition-colors",
            "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            GitHub
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>

          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Don&apos;t know what&apos;s wrong? Go check my GitHub source
          </p>
        </a>
      </div>
    </>
  );
}
