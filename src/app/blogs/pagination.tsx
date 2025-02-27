"use client";

import * as React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { type MdxContent } from "@/types/mdx";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { NUM_POST_PER_PAGE } from "./constant";

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

  const paginationCount = Math.ceil(posts.length / NUM_POST_PER_PAGE);
  const rawCurrentPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(
    rawCurrentPage > 0 ? rawCurrentPage : 1,
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

  // if possible, show 5 pagination and the current page is in the middle
  const pageStart = Math.max(2, currentPage - 2);
  const pageEnd = Math.min(paginationCount, currentPage + 2);

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
              <ChevronLeftIcon className="h-5 w-5 fill-black text-black dark:fill-white dark:text-white" />
            </Button>
          </PaginationItem>

          {
            // Always show the first pagination
          }
          <BlogPaginationLink
            href={getPageLink(1)}
            isActive={currentPage === 1}
          >
            1
          </BlogPaginationLink>

          {
            // Show ellipsis if the current page is not the first page
          }
          {pageStart > 2 && <PaginationEllipsis />}

          {
            // Show the middle pagination
          }
          {Array.from({ length: pageEnd - pageStart + 1 }).map((_, i) => {
            const page = i + pageStart;

            if (page === 1 || page === paginationCount) {
              return null;
            }

            return (
              <BlogPaginationLink
                key={page}
                href={getPageLink(page)}
                isActive={currentPage === page}
              >
                {page}
              </BlogPaginationLink>
            );
          })}

          {
            // Show ellipsis if the current page is not the last page
          }
          {pageEnd < paginationCount - 1 && <PaginationEllipsis />}

          {
            // Shows the last pagination if the
            pageEnd - pageStart >= 0 && (
              <BlogPaginationLink
                href={getPageLink(paginationCount)}
                isActive={currentPage === paginationCount}
              >
                {paginationCount}
              </BlogPaginationLink>
            )
          }

          <PaginationItem>
            <Button
              onClick={handleNext}
              disabled={currentPage >= paginationCount}
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "p-0",
              })}
            >
              <ChevronRightIcon className="h-5 w-5 fill-black text-black dark:fill-white dark:text-white" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
};

export default BlogPagination;
