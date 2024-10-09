import * as React from "react";
import { MDXProvider } from "@mdx-js/react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
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
};

export default components;
