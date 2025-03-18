import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import mermaid from "mermaid";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExternalLink from "@/components/external-link";
import Callout from "@/components/callout";
import BlogCode from "./code";
import CSSComparisonChart from "./css-comparison-chart";
import CodeSandbox from "./codesandbox";
import Mermaid from "./mermaid";
import { ClientOnly } from "@/components/client-only";

mermaid.initialize({
  startOnLoad: true,
});

const components: NonNullable<
  React.ComponentProps<typeof MDXProvider>["components"]
> = {
  Callout,
  CSSComparisonChart,
  CodeSandbox,

  table: ({ className, ...rest }) => (
    <Table {...rest} className={cn("lg:content-container", className)} />
  ),

  thead: ({ className, ...rest }) => (
    <TableHeader
      {...rest}
      className={cn(className, "font-bold [&_tr]:hover:bg-transparent")}
    />
  ),

  tbody: (props) => <TableBody {...props} />,

  th: (props) => <TableCell {...props} />,

  td: (props) => <TableCell {...props} />,

  tr: (props) => <TableRow {...props} />,

  a: (props) => {
    const { href, ...rest } = props;

    /* Internal links (on different pages) */
    if (href && href.startsWith("/")) {
      return <Link href={href} className="dark:text-lime-400" {...rest} />;
    }

    /* Slug links (on the same page) */
    if (href && href.startsWith("#")) {
      return <a href={href as string} {...rest} />;
    }

    /* External links to different sites  */
    return <ExternalLink title={`Go to ${href}`} href={href} {...rest} />;
  },

  img: (props) => {
    const { src, alt = "" } = props;

    if (typeof src === "undefined") {
      throw new Error("Image src is required");
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={1470}
        height={980}
        quality={100}
        className="rounded-lg object-cover object-center"
        loading="lazy"
      />
    );
  },

  figure: (
    props: React.HTMLAttributes<HTMLElement> & {
      "data-rehype-pretty-code-figure"?: string;
    },
  ) => {
    const { children, ...rest } = props;

    const firstChild = React.Children.toArray(
      children,
    )[0] as React.ReactElement<{
      children: string;
    }>;
    const secondChild = React.Children.toArray(children)[1];

    // get props of the first child
    if (
      typeof props["data-rehype-pretty-code-figure"] !== "undefined" &&
      React.isValidElement(firstChild) &&
      React.isValidElement<HTMLPreElement>(secondChild)
    ) {
      const cloneFirstChild = React.cloneElement(firstChild, {}, null);

      const cloneSecondChild = React.cloneElement<HTMLPreElement>(secondChild, {
        ...secondChild.props,
        title: firstChild.props.children,
      });

      return (
        <figure {...rest}>
          {cloneFirstChild}
          {cloneSecondChild}
        </figure>
      );
    }

    return <figure {...props} />;
  },

  pre: (props) => {
    const {
      title,
      lang,
      disablecopybutton,
      displaylinenumbers: _,
      ...rest
    } = props as React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    > & {
      title: string;
      lang: string;
      disablecopybutton?: string;
      displaylinenumbers?: boolean;
      "data-language": string;
    };

    if (rest["data-language"] === "mermaid") {
      if (React.isValidElement(props.children)) {
        const content = props.children.props.children as string;

        return (
          <ClientOnly>
            <Mermaid>{content}</Mermaid>;
          </ClientOnly>
        );
      }
    }

    return (
      <BlogCode
        title={title}
        lang={lang}
        disableCopyButton={typeof disablecopybutton === "string"}
        {...rest}
      />
    );
  },

  blockquote: (props) => {
    const { children, ...rest } = props;

    return <blockquote {...rest}>{children}</blockquote>;
  },
};

export default components;
