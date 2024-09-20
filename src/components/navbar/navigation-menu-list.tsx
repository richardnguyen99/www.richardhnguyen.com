"use client";

import * as React from "react";
import Link from "next/link";

import {
  navigationMenuTriggerStyle,
  NavigationMenuLink as UINavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<
  {
    isListReady: boolean;
    title: string;
    initialDelay?: number;
    items: Array<{
      text: string;
      url: string;
    }>;
  } & React.HTMLAttributes<HTMLUListElement>
>;

const NavigationMenuList: React.FC<Props> = ({
  isListReady,
  items,
  title,
  initialDelay = 0,
  ...rest
}) => {
  return (
    <ul {...rest} className="flex w-full list-none flex-col gap-4">
      <li
        className={cn(
          "-translate-y-4 transform-gpu text-gray-600 opacity-0 transition-[opacity,transform] duration-300 ease-out",
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
            "-translate-y-4 transform-gpu opacity-0 transition-[opacity,transform] duration-300 ease-out",
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
          <Link href={item.url} legacyBehavior passHref>
            <UINavigationMenuLink className="">
              {item.text}
            </UINavigationMenuLink>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenuList;
