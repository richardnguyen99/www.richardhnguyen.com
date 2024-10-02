"use client";

import * as React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { MdxContent } from "@/lib/mdx";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { NUM_POST_PER_PAGE, NUM_VISIBLE_PAGES } from "./constant";

interface BlogPaginationLinKProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean;
}

const BlogPaginationLink: React.FC<BlogPaginationLinKProps> = ({
  isActive,
  className,
  ...rest
}) => {
  return (
    <PaginationItem>
      <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
          buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size: "icon",
          }),
          className,
        )}
        {...rest}
      />
    </PaginationItem>
  );
};

interface BlogPaginationProps extends React.ComponentProps<"nav"> {
  posts: MdxContent[];
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  className,
  posts,
  ...rest
}) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const paginationCount = Math.ceil(posts.length / NUM_POST_PER_PAGE);
  const paginationItems = Array.from({ length: paginationCount });
  const paginationStart = Math.max(1, currentPage - 2);
  const paginationEnd = Math.min(
    paginationStart + NUM_VISIBLE_PAGES,
    paginationCount,
  );

  const handlePrevious = React.useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(currentPage - 1));

    push(`${pathname}?${params.toString()}`);
  }, [currentPage, pathname, push, searchParams]);

  const handleNext = React.useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(currentPage + 1));

    push(`${pathname}?${params.toString()}`);
  }, [currentPage, pathname, push, searchParams]);

  const getPageLink = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", String(page));

      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  return (
    paginationCount > 0 && (
      <Pagination className={cn("mt-14", className)} {...rest}>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1 || paginationCount === 0}
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "p-0",
              })}
            >
              <ChevronLeftIcon className="h-5 w-5 fill-white text-white" />
            </Button>
          </PaginationItem>

          {
            // Show the first pagination and ellipsis if the current page is not
            // the first page
            paginationStart > 1 && paginationEnd > NUM_VISIBLE_PAGES && (
              <>
                <BlogPaginationLink href={getPageLink(1)}>1</BlogPaginationLink>
                <PaginationEllipsis />
              </>
            )
          }

          {paginationItems
            .slice(paginationStart - 1, paginationEnd)
            .map((_, i) => (
              <BlogPaginationLink
                key={i}
                href={getPageLink(i + 1)}
                isActive={currentPage === paginationStart + i}
              >
                {paginationStart + i}
              </BlogPaginationLink>
            ))}

          {
            // Show ellipsis and the last pagination if the current page is not
            // the last page
            paginationEnd < paginationCount && (
              <>
                <PaginationEllipsis />
                <BlogPaginationLink href={getPageLink(paginationCount)}>
                  {paginationCount}
                </BlogPaginationLink>
              </>
            )
          }

          <PaginationItem>
            <Button
              onClick={handleNext}
              disabled={
                currentPage === paginationCount || paginationCount === 0
              }
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "p-0",
              })}
            >
              <ChevronRightIcon className="h-5 w-5 fill-white text-white" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
};

export default BlogPagination;
