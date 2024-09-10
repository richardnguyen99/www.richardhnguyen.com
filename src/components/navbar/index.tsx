import * as React from "react";

import { cn } from "@/lib/utils";
import NavbarNavigationMenu from "./navigation-menu";

const Navbar: React.FC = async () => {
  return (
    <header
      aria-label="Main Navigation"
      className={cn(
        "fixed top-0 z-[100]",
        "m-auto w-full max-w-full md:py-0",
        "ease-curve-d transition-header transform-gpu",
      )}
    >
      <NavbarNavigationMenu />
    </header>
  );
};

export default Navbar;
