"use client";

import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

const LayoutMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navbarContext = useNavbarContext();

  return (
    <>
      <main
        id="main"
        tabIndex={-1}
        className={cn(
          "flex flex-col items-center justify-between",
          "relative min-h-screen pt-[66px] outline-none",
          "origin-[50%_0px] transition-[transform,_opacity,_filter]",
          "ease-out-cubic duration-300",
          {
            "delay-75 duration-700": !navbarContext.isOpen,
            "duration-300": navbarContext.isOpen,
            "blur-[50px] saturate-[2]": navbarContext.isOpen,
            "translate-y-[5rem] scale-[0.96]": navbarContext.isOpen,
            "overflow-hidden": navbarContext.isOpen,
          },
        )}
      >
        {children}
      </main>

      <footer
        className={cn(
          "mt-12 bg-black text-white md:mt-20 lg:mt-28",
          "origin-[50%_0px] transition-[transform,_opacity,_filter]",
          "ease-out-cubic overflow-hidden duration-300",
          {
            "delay-75 duration-700": !navbarContext.isOpen,
            "duration-300": navbarContext.isOpen,
            "blur-[50px] saturate-[2]": navbarContext.isOpen,
            "translate-y-[5rem] scale-[0.96]": navbarContext.isOpen,
            "overflow-hidden": navbarContext.isOpen,
          },
        )}
      >
        <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
          <div className="grid grid-cols-12 grid-rows-2 py-12 lg:grid-rows-1 lg:gap-4">
            <div className="col-span-5 col-start-1 row-start-1">
              <div className="relative h-full w-full">
                <div className="flex items-center gap-4">
                  <div className="h-7 w-7 bg-white"></div>
                  <h3 className="text-lg">richardhnguyen.com</h3>
                </div>

                <div className="relative mt-3 md:mt-6 lg:mt-8">
                  <p className="text-sm">
                    Subscribe to the newsletter for updates on new articles
                  </p>

                  <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" />
                    <Button
                      className="ease-curve-d relative transform-gpu bg-neutral-900 transition-[transform,box_shadow] duration-300 hover:bg-neutral-800 hover:ring-1 hover:ring-neutral-700 active:bg-neutral-700 active:ring-2 active:ring-neutral-500"
                      type="submit"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 col-start-1 row-start-2 lg:col-span-12 lg:col-start-6 lg:row-start-1">
              <div>Footer Navigation</div>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-700">
          <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
            <div className="flex items-center justify-between py-4">
              <p className="text-center text-sm">
                richardhnguyen.com - © 2023 - {new Date().getFullYear()}
              </p>

              <div className="flex items-center gap-3 text-sm">
                <a
                  className="rounded-full p-2 hover:bg-neutral-700"
                  target="_blank"
                  href="#"
                >
                  <Image
                    src="/x.svg"
                    alt="X Simple Logo"
                    className="invert"
                    width={24}
                    height={24}
                    priority
                  />
                  <p className="sr-only">X simple logo</p>
                </a>

                <a
                  className="rounded-full p-2 hover:bg-neutral-700"
                  target="_blank"
                  href="https://github.com/richardnguyen99"
                  rel="noopener"
                >
                  <Image
                    src="/github.svg"
                    alt="GitHub Simple Logo"
                    className="invert"
                    width={24}
                    height={24}
                    priority
                  />

                  <p className="sr-only">GitHub simple logo</p>
                </a>

                <a
                  className="rounded-full p-2 hover:bg-neutral-700"
                  target="_blank"
                  href="https://www.linkedin.com/in/richardmhnguyen/"
                  rel="noopener"
                >
                  <Image
                    src="/linkedin.svg"
                    alt="LinkedIn Simple Logo"
                    className="invert"
                    width={24}
                    height={24}
                    priority
                  />

                  <p className="sr-only">LinkedIn simple logo</p>
                </a>

                <a
                  className="rounded-full p-2 hover:bg-neutral-700"
                  target="_blank"
                  href="https://stackoverflow.com/users/12915739/richard-h-nguyen"
                  rel="noopener"
                >
                  <Image
                    src="/stack-overflow.svg"
                    alt="Stack Overflow Simple Logo"
                    className="invert"
                    width={24}
                    height={24}
                    priority
                  />

                  <p className="sr-only">Stack Overflow simple logo</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LayoutMain;
