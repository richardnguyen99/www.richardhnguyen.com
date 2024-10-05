import * as React from "react";

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

const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({
  title,
  href,
  className,
  ...rest
}) => {
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
              <ExternalLink title={`Edit on GitHub`} href={href}>
                {title}
              </ExternalLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BlogBreadcrumb;
