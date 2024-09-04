"use client";

import * as React from "react";
import Link from "next/link";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavbarContext } from "./context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleContentItem,
  CollapsibleContentLink,
  CollapsibleHeading,
} from "./collapsible";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar: React.FC = () => {
  const navbarContext = useNavbarContext();

  const handleValueChange = (value: string) => {
    if (value === "" || value.length === 0) {
      navbarContext.handleIsOpen(false);
    } else {
      navbarContext.handleIsOpen(true);
    }
  };

  return (
    <header
      aria-label="Main Navigation"
      className={cn(
        "fixed top-0 z-[100]",
        "m-auto w-full md:py-0",
        "ease-curve-d transition-header transform-gpu",
      )}
    >
      <NavigationMenu onValueChange={handleValueChange}>
        <div
          className={cn(
            "pointer-events-none z-[-1] transform-gpu",
            "ease-out-cubic transition-[opacity,transform] duration-300",
            "absolute left-1/2 top-0 h-[42.5rem] w-[200%]",
            "-translate-x-[100vw]",
            "bg-white blur-[200px] saturate-[2]",
            {
              "-translate-y-[100%] opacity-0": !navbarContext.isOpen,
              "-translate-y-1/2 opacity-100": navbarContext.isOpen,
            },
          )}
        ></div>

        <div
          className={cn(
            "ease-out-cubic relative z-50 mx-auto h-full min-h-[3.125rem] w-full transform-gpu bg-white backdrop-blur transition duration-300 md:h-[3.125rem] md:backdrop-blur-xl",
          )}
        >
          <div
            className={cn(
              "ease-curve-d container relative flex min-h-[3.125rem] items-center justify-between transition duration-300 md:h-full [&>div]:h-full",
            )}
          >
            <Link
              href="/"
              passHref
              className={cn(
                "flex items-center justify-center",
                "h-10 w-10 rounded-full p-2",
                "hover:bg-slate-100",
              )}
              onClick={() => navbarContext.handleIsOpen(false)}
            >
              <div className="h-full w-full bg-black"></div>
            </Link>

            <div
              className={cn(
                "ml-auto flex items-center justify-center gap-[0.5rem] md:hidden",
              )}
            >
              <button
                className={cn(
                  "group relative block",
                  "h-10 w-10 rounded-full p-2",
                  "hover:bg-neutral-100",
                  "ease-curve-d transition-opacity duration-300",
                  {
                    "opacity-0": navbarContext.isOpen,
                    "opacity-100": !navbarContext.isOpen,
                  },
                )}
                type="button"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-full w-full" />
              </button>

              <button
                className={cn(
                  "group relative block",
                  "h-10 w-10 rounded-full p-2",
                  "hover:bg-neutral-100",
                )}
                type="button"
                aria-label="menu"
                onClick={() =>
                  navbarContext.handleIsOpen(!navbarContext.isOpen)
                }
              >
                <HamburgerMenuIcon className="h-full w-full" />
              </button>
            </div>

            <div className="[&>div]:!static [&>div]:h-full">
              <NavigationMenuList
                className={cn(
                  "hidden h-full items-center justify-center md:flex",
                )}
              >
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>

                  <NavigationMenuContent className="lg:left-[calc(0.5_*_(100%-1024px))]">
                    <div className="">
                      <ul>
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Icons.logo className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components built with Radix
                                UI and Tailwind CSS.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent className="lg:left-[calc(0.5_*_(100%_-_1024px))]">
                    <ul>
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Icons.logo className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components built with Radix
                              UI and Tailwind CSS.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink>Documentation</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>

            <button
              className={cn(
                "group relative hidden md:block",
                "h-10 w-10 rounded-full p-2",
                "hover:bg-neutral-100",
              )}
              type="button"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-full w-full" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "ease-curve-d transform-gpu transition-opacity duration-300",
            "pointer-events-none absolute opacity-0",
            "md:!pointer-events-none md:!hidden md:!opacity-0",
            "h-screen w-full",
            {
              "pointer-events-auto opacity-100": navbarContext.isOpen,
            },
          )}
          aria-expanded={true}
        >
          <div className="relative h-full max-h-[calc(100vh_-_(50px+(16px*2)))] w-full overflow-y-auto">
            <ul
              id="mobile-menu"
              className={cn(
                "text-small container flex w-full flex-col justify-between pb-[3rem] pt-[3rem]",
                {
                  invisible: !navbarContext.isOpen,
                },
              )}
            >
              <Collapsible>
                <CollapsibleHeading>Getting started</CollapsibleHeading>
                <CollapsibleContent>
                  <CollapsibleContentItem>
                    <span className="text-black">Our research</span>
                    <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                    </ul>
                  </CollapsibleContentItem>

                  <CollapsibleContentItem>
                    <span className="text-black">Our research</span>
                    <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                    </ul>
                  </CollapsibleContentItem>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleHeading>Getting started</CollapsibleHeading>
                <CollapsibleContent>
                  <CollapsibleContentItem>
                    <span className="text-black">Our research</span>
                    <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                    </ul>
                  </CollapsibleContentItem>

                  <CollapsibleContentItem>
                    <span className="text-black">Our research</span>
                    <ul className="mb-4 mt-4 flex flex-col gap-4 group-last:mb-0">
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                      <li>
                        <CollapsibleContentLink href="/docs">
                          Overview
                        </CollapsibleContentLink>
                      </li>
                    </ul>
                  </CollapsibleContentItem>
                </CollapsibleContent>
              </Collapsible>
            </ul>
          </div>
        </div>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
