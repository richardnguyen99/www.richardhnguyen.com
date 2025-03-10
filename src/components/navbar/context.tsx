"use client";
import * as React from "react";

type Tab = "navigation" | "search" | "mobile" | null;
export interface NavbarContextValue {
  isOpen: boolean;
  handleIsOpen: (_newIsOpen: boolean) => void;
  open(): void;
  close(): void;
  tab: Tab;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
  activeCollapsiblleTab: string;
  setActiveCollapsibleTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavbarProviderProps {}

const NavbarContext = React.createContext<NavbarContextValue | undefined>(
  undefined,
);

const NavbarProvider: React.FC<
  React.PropsWithChildren<NavbarProviderProps>
> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileMenuOpen] = React.useState(false);
  const [activeCollapsiblleTab, setActiveCollapsibleTab] = React.useState("");
  const [timeoutId, setTimeoutId] = React.useState<number | null>(null);
  const [tab, setTab] = React.useState<Tab>(null);

  const handleIsOpen = React.useCallback(
    (newIsOpen: boolean) => {
      const body = document.querySelector("body");

      // This is a temporary fix to prevent scrolling when the menu is open.
      if (newIsOpen) {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }

        body?.classList.add("overflow-hidden");
      } else {
        // Stop displaying a scrollbar after the menu is closed on fit screen.
        const timer = window.setTimeout(() => {
          body?.classList.remove("overflow-hidden");
        }, 700);

        setTimeoutId(timer);
      }

      setIsOpen(newIsOpen);
      setActiveCollapsibleTab((prev) => (newIsOpen ? prev : ""));
    },
    [timeoutId],
  );

  const open = React.useCallback(() => {
    handleIsOpen(true);
  }, [handleIsOpen]);

  const close = React.useCallback(() => {
    handleIsOpen(false);
  }, [handleIsOpen]);

  const value = React.useMemo(() => {
    return {
      isOpen,
      isMobileMenuOpen,
      activeCollapsiblleTab,
      setActiveCollapsibleTab,
      handleIsOpen,
      open,
      close,
      tab,
      setTab,
    };
  }, [
    isOpen,
    isMobileMenuOpen,
    activeCollapsiblleTab,
    handleIsOpen,
    open,
    close,
    tab,
    setTab,
  ]);

  return (
    <NavbarContext value={value} {...props}>
      {children}
    </NavbarContext>
  );
};

export const useNavbarContext = () => {
  const context = React.useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};

export default NavbarProvider;
