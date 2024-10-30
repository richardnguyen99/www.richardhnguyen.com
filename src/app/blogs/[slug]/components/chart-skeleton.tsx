import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton: React.FC<
  React.PropsWithChildren<{
    type: "error" | "loading" | "empty";
  }>
> = ({ type }) => (
  <Card className="mx-[var(--article-gutter-size)] w-[var(--article-container-size)]">
    <CardHeader>
      <CardTitle className="!mx-0 !w-full">Download Comparison</CardTitle>
      {type === "loading" ? (
        <Skeleton className="h-[32px] w-full rounded-xl" />
      ) : null}
    </CardHeader>
    <CardContent>
      {type === "loading" ? (
        <Skeleton className="min-h-[378px] w-full" />
      ) : (
        <div>No data available</div>
      )}
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-medium leading-none"></div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            <Skeleton className="h-[14px] w-[250px] rounded-xl" />
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
);

export default ChartSkeleton;
