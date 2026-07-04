import { type JSX } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  type: "error" | "loading" | "empty";
};

export default function ChartSkeleton({ type }: Props): JSX.Element {
  return (
    <Card className="mx-(--article-gutter-size) w-(--article-container-size)">
      <CardHeader>
        <CardTitle className="mx-0! w-full!">Download Comparison</CardTitle>
        {type === "loading" ? (
          <Skeleton className="h-8 w-full rounded-xl" />
        ) : null}
      </CardHeader>

      <CardContent>
        {type === "loading" ? (
          <Skeleton className="min-h-94.5 w-full" />
        ) : (
          <div>No data available</div>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium"></div>

            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              <Skeleton className="h-3.5 w-62.5 rounded-xl" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
