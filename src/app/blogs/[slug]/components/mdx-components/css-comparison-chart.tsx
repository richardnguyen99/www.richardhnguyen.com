"use client";

import React, { type JSX } from "react";
import useSWR from "swr";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartSkeleton from "../chart-skeleton";

interface NpmDownloadResponse {
  package: string;
  start: string;
  end: string;
  downloads: Array<{
    downloads: string;
    day: string;
  }>;
}

const getNpmDownloadsUrl = (packageName: string, start: Date, end: Date) => {
  const startDate = start.toISOString().split("T")[0];
  const endDate = end.toISOString().split("T")[0];

  return `https://api.npmjs.org/downloads/range/${startDate}:${endDate}/${packageName}`;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const useAggregateSWR = (packageName: string) => {
  const today = new Date();

  const lastYear = new Date(today);
  lastYear.setDate(today.getDate() - 365);

  const lastTwoYears = new Date(lastYear);
  lastTwoYears.setDate(lastYear.getDate() - 365);

  const { data: data1, error: error1 } = useSWR<NpmDownloadResponse>(
    getNpmDownloadsUrl(packageName, lastTwoYears, lastYear),
    fetcher,
  );

  const { data: data2, error: error2 } = useSWR<NpmDownloadResponse>(
    getNpmDownloadsUrl(packageName, lastYear, today),
    fetcher,
  );

  if (!data1 || !data2) {
    return {
      data: null,
      error: null,
      isLoading: true,
    };
  }

  if (error1 || error2) {
    return {
      data: null,
      error: error1 || error2,
      isLoading: false,
    };
  }

  return {
    data: {
      package: data1.package,
      start: data1.start,
      end: data2.end,
      downloads: [...data1.downloads, ...data2.downloads],
    },
    error: null,
    isLoading: false,
  };
};

export const description = "A multiple line chart";

const chartConfig = {
  tailwindcss: {
    label: "TailwindCSS",
    color: "hsl(var(--chart-1))",
  },
  bootstrap: {
    label: "Bootstrap",
    color: "hsl(var(--chart-2))",
  },
  materialui: {
    label: "Material UI",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function CSSComparisonChart(): JSX.Element {
  const {
    data: twData,
    error: twError,
    isLoading: twLoading,
  } = useAggregateSWR("tailwindcss");

  const {
    data: bsData,
    error: bsError,
    isLoading: bsLoading,
  } = useAggregateSWR("bootstrap");

  const {
    data: muiData,
    error: muiError,
    isLoading: muiLoading,
  } = useAggregateSWR("@mui/material");

  if (twLoading || bsLoading || muiLoading) {
    return <ChartSkeleton type="loading" />;
  }

  if (twError || bsError || muiError) {
    return <ChartSkeleton type="error" />;
  }

  if (!twData || !bsData || !muiData) {
    return <ChartSkeleton type="empty" />;
  }

  const mergedChartData = twData.downloads
    .map((tw, index) => ({
      date: tw.day,
      tailwindcss: parseInt(tw.downloads),
      bootstrap: parseInt(bsData.downloads[index].downloads),
      materialui: parseInt(muiData.downloads[index].downloads),
    }))
    .reduce(
      (acc, curr, index) => {
        if (index === 0 || index % 7 !== 0) {
          acc.push(curr);
        } else {
          const slices = acc.slice(index - 6, index);
          acc.push({
            date: curr.date,
            tailwindcss:
              slices.reduce((acc, curr) => acc + curr.tailwindcss, 0) +
              curr.tailwindcss,
            bootstrap:
              slices.reduce((acc, curr) => acc + curr.bootstrap, 0) +
              curr.bootstrap,
            materialui:
              slices.reduce((acc, curr) => acc + curr.materialui, 0) +
              curr.materialui,
          });
        }

        return acc;
      },
      [] as Array<{
        date: string;
        tailwindcss: number;
        bootstrap: number;
        materialui: number;
      }>,
    )
    .filter((_, index) => index % 7 === 0)
    .slice(1);

  return (
    <Card className="mx-[var(--article-gutter-size)] w-[var(--article-container-size)] border-neutral-300 dark:border-neutral-600">
      <CardHeader>
        <CardTitle className="!mx-0 !w-full">Download Comparison</CardTitle>
        <CardDescription className="!mx-0 !w-full">
          From {mergedChartData[0].date} to {mergedChartData.slice(-1)[0].date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[378px] w-full">
          <LineChart
            accessibilityLayer
            data={mergedChartData}
            margin={{
              left: 30,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={30}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="tailwindcss"
              type="monotone"
              stroke="var(--color-tailwindcss)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bootstrap"
              type="monotone"
              stroke="var(--color-bootstrap)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="materialui"
              type="monotone"
              stroke="var(--color-materialui)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by{" "}
              {(
                ((mergedChartData.slice(-1)[0].tailwindcss -
                  mergedChartData[0].tailwindcss) /
                  mergedChartData[0].tailwindcss) *
                100
              ).toFixed(1)}{" "}
              % <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total downloads for the last 2 years
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
