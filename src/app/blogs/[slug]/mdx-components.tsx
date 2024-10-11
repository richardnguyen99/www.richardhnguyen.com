import * as React from "react";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import ExternalLink from "@/components/external-link";

const components: NonNullable<
  React.ComponentProps<typeof MDXProvider>["components"]
> = {
  table: ({ className, ...rest }) => (
    <Table {...rest} className={cn(className)} />
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
};

export default components;
