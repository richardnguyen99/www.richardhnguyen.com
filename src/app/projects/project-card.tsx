import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { RepoForkedIcon, StarIcon } from "@primer/octicons-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  url: string;
  starCounts: number;
  forkCounts: number;
  pinned: boolean;
  description: string | null;
  demoUrl: string | null;
};

const CardWithForm: React.FC<Props> = ({
  title,
  url,
  starCounts,
  forkCounts,
  pinned,
  description,
  demoUrl,
}) => {
  return (
    <div
      key={url}
      className="rounded-lg border border-neutral-200 bg-accent/50 dark:border-neutral-700"
    >
      <div className="flex h-full flex-col justify-between gap-6 p-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "lg",
                    className:
                      "block overflow-hidden text-ellipsis whitespace-nowrap px-0 text-left text-xl font-semibold",
                  }),
                )}
              >
                {title}
              </a>
            </div>

            {pinned && (
              <span className="flex-shrink-0 rounded-full border px-2 py-1 text-xs dark:border-fuchsia-500 dark:text-fuchsia-500">
                Pinned
              </span>
            )}
          </div>
          <p className="line-clamp-2 h-[40px] text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span>
              <StarIcon className="mr-1 inline-block" />
              {starCounts}
            </span>
            <span>
              <RepoForkedIcon className="mr-1 inline-block" />
              {forkCounts}
            </span>
          </div>

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className:
                    "w-full rounded-full border-neutral-200 bg-neutral-200/0 hover:bg-neutral-200/70 dark:border-neutral-700 dark:bg-neutral-700/0 dark:hover:bg-neutral-700/70 sm:w-auto",
                }),
              )}
            >
              View demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardWithForm;
