import React, { type JSX } from "react";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ExternalLink from "@/components/external-link";

interface BlogBreadcrumbProps extends React.ComponentProps<"nav"> {
  title: string;
  href: string;
}

export default function BlogBreadcrumb({
  title,
  href,
  className,
  ...rest
}: BlogBreadcrumbProps): JSX.Element {
  return (
    <div className="mx-auto mb-24 mt-12 flex w-[var(--article-container-size)] items-center justify-center px-[var(--article-gutter-size)]">
      <Breadcrumb className={cn(className)} {...rest}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <ExternalLink
                title={`Edit on GitHub`}
                href={href}
                className="[&_span]:text-black [&_span]:hover:border-black dark:[&_span]:text-white dark:[&_span]:hover:border-white [&_svg]:text-black dark:[&_svg]:text-white"
              >
                {title}
              </ExternalLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
