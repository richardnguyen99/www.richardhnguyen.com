"use client";

import * as React from "react";
import { type LinkProps } from "next/link";
import NextLink from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useNavbarContext } from "./context";

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  id: string;
}

interface CollapsibleProps {
  children: React.ReactNode;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null,
);

const CollapsibleTrigger: React.FC<CollapsibleProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <CollapsibleContext.Provider value={{ id, open, toggle }}>
      <li id={id} className="group">
        {props.children}
      </li>
    </CollapsibleContext.Provider>
  );
};

interface CollapsibleHeadingProps {
  children: React.ReactNode;
}

const CollapsibleHeading = React.forwardRef<
  HTMLButtonElement,
  CollapsibleHeadingProps & React.ComponentPropsWithoutRef<"button">
>((props, ref) => {
  const { children, ...rest } = props;

  const navbarContext = useNavbarContext();
  const collapsibleContext = React.useContext(CollapsibleContext);

  if (!collapsibleContext) {
    throw new Error(
      "Collapsible.Heading must be used within a Collapsible component",
    );
  }

  const { open, toggle } = collapsibleContext;

  const handleClick = React.useCallback(() => {
    toggle();

    if (navbarContext.activeCollapsiblleTab === collapsibleContext.id) {
      navbarContext.setActiveCollapsibleTab("");
    } else {
      navbarContext.setActiveCollapsibleTab(collapsibleContext.id);
    }
  }, [collapsibleContext.id, navbarContext, toggle]);

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      aria-expanded={open}
      onClick={handleClick}
      className={cn(
        "group flex h-full w-full items-center justify-between py-1",
      )}
    >
      <span className="text-2xl text-gray-600 dark:text-gray-400">
        {children}
      </span>

      <ChevronDownIcon
        className={cn(
          "h-4 w-4 fill-gray-500 text-gray-500 dark:fill-gray-400 dark:text-gray-400",
          "ease-curve-d transition-[opacity,transform] duration-200",
          {
            "-translate-y-1 opacity-0":
              navbarContext.activeCollapsiblleTab !== collapsibleContext.id,
            "translate-y-0 opacity-100":
              navbarContext.activeCollapsiblleTab === collapsibleContext.id,
          },
        )}
      />
    </button>
  );
});
CollapsibleHeading.displayName = "Collapsible.Heading";

interface CollapsibleContentProps {
  children: React.ReactNode;
}

const CollapsibleContent = React.forwardRef<
  HTMLUListElement,
  CollapsibleContentProps & React.ComponentPropsWithoutRef<"ul">
>((props, ref) => {
  const { children, ...rest } = props;
  const navbarContext = useNavbarContext();
  const collapsibleContext = React.useContext(CollapsibleContext);

  if (!collapsibleContext) {
    throw new Error(
      "Collapsible.Content must be used within a Collapsible component",
    );
  }

  const { id } = collapsibleContext;

  return (
    <ul
      {...rest}
      ref={ref}
      className={cn(
        "ease-curve-d flex flex-col gap-4 overflow-hidden border-b opacity-0 transition-all duration-100 group-last:border-none group-last:pb-0",
        "invisible max-h-0 border-transparent opacity-0",
        {
          "visible max-h-[50rem] border-gray-200 opacity-100 dark:border-gray-700":
            navbarContext.isOpen && navbarContext.activeCollapsiblleTab === id,
        },
      )}
    >
      {children}
    </ul>
  );
});
CollapsibleContent.displayName = "Collapsible.Content";

interface CollapsibleContentItemProps {
  children: React.ReactNode;
}

const CollapsibleContentItem = React.forwardRef<
  HTMLLIElement,
  CollapsibleContentItemProps & React.ComponentPropsWithoutRef<"li">
>((props, ref) => {
  const { children, ...rest } = props;

  const navbarContext = useNavbarContext();
  const collapsibleContext = React.useContext(CollapsibleContext);

  if (!collapsibleContext) {
    throw new Error(
      "Collapsible.ContentItem must be used within a Collapsible component",
    );
  }

  if (!navbarContext) {
    throw new Error(
      "Collapsible.NavbarContext must be used within a Collapsible component",
    );
  }

  return (
    <li
      {...rest}
      ref={ref}
      className={cn(
        "ease-curve-d group transform-gpu text-[1.25rem] font-normal leading-[150%] opacity-100 transition-all duration-100 first:mt-4 last:mb-4",
        {
          "-translate-y-1 opacity-0":
            navbarContext.activeCollapsiblleTab !== collapsibleContext.id,
          "translate-y-0 opacity-100":
            navbarContext.activeCollapsiblleTab === collapsibleContext.id,
        },
      )}
    >
      {children}
    </li>
  );
});
CollapsibleContentItem.displayName = "Collapsible.ContentItem";

interface CollapsibleContentLinkProps extends LinkProps {
  children: React.ReactNode;
}

const CollapsibleContentLink = React.forwardRef<
  HTMLAnchorElement,
  CollapsibleContentLinkProps & React.ComponentPropsWithoutRef<"a">
>((props, ref) => {
  const { children, href, ...rest } = props;
  const collapsibleContext = React.useContext(CollapsibleContext);
  const navbarContext = useNavbarContext();

  if (!collapsibleContext) {
    throw new Error(
      "Collapsible.ContentLink must be used within a Collapsible component",
    );
  }

  const { open, toggle } = collapsibleContext;
  const { handleIsOpen } = navbarContext;

  const handleClick = () => {
    toggle();
    handleIsOpen(!open);
  };

  return (
    <NextLink
      ref={ref}
      href={href}
      className={cn(
        "transform-gpu transition duration-300 ease-linear",
        "text-black dark:text-white",
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
});
CollapsibleContentLink.displayName = "Collapsible.ContentLink";

export {
  CollapsibleTrigger,
  CollapsibleHeading,
  CollapsibleContent,
  CollapsibleContentItem,
  CollapsibleContentLink,
};
