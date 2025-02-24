"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavigationMenuLink as UINavigationMenuLink } from "@/components/ui/navigation-menu";
import { type FrontMatter } from "@/types/mdx";
import { useNavbarContext } from "./context";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  latestPost: FrontMatter;
  isListReady: boolean;
  initialDelay?: number;
};

const NavigationMenuLatestPost: React.FC<Props> = ({
  isListReady,
  initialDelay = 0,
  latestPost,
  className,
  ...rest
}) => {
  const navbarContext = useNavbarContext();

  const handleClickCapture = () => {
    navbarContext.handleIsOpen(false);
  };

  return (
    <div
      {...rest}
      onClickCapture={handleClickCapture}
      className={cn("relative w-full", className)}
    >
      <Link
        href={`/blogs/${latestPost.slug}`}
        className="group"
        passHref
        legacyBehavior
      >
        <UINavigationMenuLink className="group">
          <div
            className={cn(
              "aspect-[16/9] w-full overflow-hidden rounded-lg",
              "w-full -translate-y-4 rounded-lg opacity-0 transition-[opacity,transform] duration-300 ease-in-out",
              {
                "translate-y-0 opacity-100": isListReady,
                "-translate-y-4 opacity-0": !isListReady,
              },
            )}
            style={
              isListReady
                ? {
                    transitionDelay: `${initialDelay}ms`,
                  }
                : {}
            }
          >
            <Image
              src={latestPost.thumbnail}
              alt={latestPost.title}
              className={cn("object-cover object-center")}
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill={true}
            />
          </div>

          <h3
            className={cn(
              "text-xl font-extrabold leading-6 tracking-tight",
              "mt-4",
              "w-full -translate-y-10 rounded-lg opacity-0 transition-[opacity,transform] duration-300 ease-in-out",
              {
                "translate-y-0 opacity-100": isListReady,
                "-translate-y-10 opacity-0": !isListReady,
              },
            )}
            style={
              isListReady
                ? {
                    transitionDelay: `${initialDelay + 50}ms`,
                  }
                : {}
            }
          >
            {latestPost.title}
          </h3>
        </UINavigationMenuLink>
      </Link>
    </div>
  );
};

export default NavigationMenuLatestPost;
