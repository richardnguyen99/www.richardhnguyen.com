import * as React from "react";

type ComponentProps = {
  title: string;
  href: string;
  description: string;
};

export interface NavbarContextValue {
  components: ComponentProps[];
  isOpen: boolean;
  handleIsOpen: (_newIsOpen: boolean) => void;
}

export interface NavbarProviderProps {
  components: ComponentProps[];
}

const NavbarContext = React.createContext<NavbarContextValue | undefined>(
  undefined,
);

const NavbarProvider: React.FC<
  React.PropsWithChildren<NavbarProviderProps>
> = ({ children, components, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpen = React.useCallback((newIsOpen: boolean) => {
    const body = document.querySelector("body");

    // This is a temporary fix to prevent scrolling when the menu is open.
    if (newIsOpen) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }

    setIsOpen(newIsOpen);
  }, []);

  const value = React.useMemo(() => {
    return { components, isOpen, handleIsOpen };
  }, [isOpen, components, handleIsOpen]);

  return (
    <NavbarContext.Provider value={value} {...props}>
      {children}
    </NavbarContext.Provider>
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
