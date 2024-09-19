"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "@/components/navbar/context";

interface FooterProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

const Footer: React.FC<FooterProps> = ({ children, className, ...rest }) => {
  const navbarContext = useNavbarContext();

  return (
    <footer
      {...rest}
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
        className,
      )}
    >
      {children}
    </footer>
  );
};

export default Footer;
