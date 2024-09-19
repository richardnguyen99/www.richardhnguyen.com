import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface FooterGridItemProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLLIElement>> {
  text: string;
  count?: number;
  url?: string;
}

const FooterGridItem: React.FC<FooterGridItemProps> = ({
  text,
  count,
  url = "/#",
  className,
  ...rest
}) => {
  return (
    <li {...rest} className={cn("text-sm", className)}>
      <Link href={url} className="group flex items-center gap-2">
        <p className="ease-curve-c leading-2 transform-gpu border-b-2 border-transparent text-lg font-medium transition-colors duration-150 group-hover:border-b-gray-600 group-hover:text-gray-500 md:text-2xl md:font-bold md:leading-5 lg:text-base lg:font-normal lg:leading-normal">
          {text}
        </p>
        {count && <sup className="text-gray-400"> ({count})</sup>}
      </Link>
    </li>
  );
};

export default FooterGridItem;
