"use client";

import React, { type JSX } from "react";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

import { NavigationMenuLink as UINavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<
  {
    isListReady: boolean;
    title: string;
    initialDelay?: number;
    items: Array<{
      text: string;
      url: string;
      external?: boolean;
    }>;
  } & React.HTMLAttributes<HTMLUListElement>
>;

const linkClassName =
  "ease-curve-d line-clamp-1 w-max transform-gpu border-b-2 border-transparent transition-[border-color] duration-200 hover:border-gray-800 dark:hover:border-gray-200";

export function NavigationMenuLink({
  text,
  url,
}: Props["items"][0]): JSX.Element {
  return (
    <Link href={url} legacyBehavior passHref>
      <UINavigationMenuLink className={cn(linkClassName)}>
        {text}
      </UINavigationMenuLink>
    </Link>
  );
}

export function NavigationMenuExternal({
  text,
  url,
}: Props["items"][0]): JSX.Element {
  return (
    <UINavigationMenuLink asChild>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          linkClassName,
          "flex w-fit flex-row flex-nowrap items-center gap-1",
        )}
      >
        <p className="line-clamp-1">{text}</p>
        <MoveUpRight size={16} className="h-4 w-4 flex-shrink-0 basis-[16px]" />
      </a>
    </UINavigationMenuLink>
  );
}

export default function NavigationMenuList({
  isListReady,
  items,
  title,
  initialDelay = 0,
  ...rest
}: Props): JSX.Element {
  return (
    <ul {...rest} className="flex w-full list-none flex-col gap-4">
      <li
        className={cn(
          "w-full -translate-y-4 transform-gpu text-gray-600 opacity-0 transition-[opacity,transform] duration-300 ease-out dark:text-gray-500",
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
        {title}
      </li>
      {items.map((item, i) => (
        <li
          key={item.url}
          className={cn(
            "w-full -translate-y-4 transform-gpu overflow-hidden opacity-0 transition-[opacity,transform] duration-300",
            {
              "translate-y-0 opacity-100": isListReady,
              "-translate-y-4 opacity-0": !isListReady,
            },
          )}
          style={
            isListReady
              ? {
                  transitionDelay: `${initialDelay + (i + 1) * 50}ms`,
                }
              : {}
          }
        >
          {item.external ? (
            <NavigationMenuExternal {...item} />
          ) : (
            <NavigationMenuLink {...item} />
          )}
        </li>
      ))}
    </ul>
  );
}
