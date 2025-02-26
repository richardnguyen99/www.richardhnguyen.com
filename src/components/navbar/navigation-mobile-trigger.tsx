"use client";

import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "./context";
import NavigationIconButton from "./navigation-icon-button";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const NavigationMobileTrigger: React.FC<Props> = ({ containerRef }) => {
  const navbarContext = useNavbarContext();

  const handleClick = React.useCallback(() => {
    if (navbarContext.isOpen) {
      navbarContext.close();
      navbarContext.setTab(null);
    } else {
      navbarContext.open();
      navbarContext.setTab("navigation");
    }
  }, [navbarContext]);

  return (
    <NavigationIconButton
      className={cn({
        "pointer-events-none stroke-neutral-400 dark:stroke-neutral-700":
          navbarContext.tab !== null && navbarContext.tab === "search",
      })}
      onClick={handleClick}
      renderIcon={() => (
        <HamburgerMenuIcon className="pointer-events-none h-full w-full" />
      )}
    >
      Open Menu
    </NavigationIconButton>
  );
};

export default NavigationMobileTrigger;
