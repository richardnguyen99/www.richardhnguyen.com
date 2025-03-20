"use client";

import React, { type JSX } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Generate TCP congestion control data with congestion collapse
const generateTcpData = (
  rounds: number,
  initialSsthresh: number,
  collapseRound: number,
) => {
  const data = [];
  let cwnd = 1; // Initial congestion window size
  let ssthresh = initialSsthresh;
  let currentPhase = "Slow Start";

  for (let round = 1; round <= rounds; round++) {
    // Check if congestion collapse occurs at this round
    if (round === collapseRound) {
      // Set new ssthresh to half of current cwnd (minimum 2)
      ssthresh = Math.max(2, Math.floor(cwnd / 2));

      // Add the point right before collapse
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "Before Collapse",
      });

      // Reset cwnd to 1 after collapse
      cwnd = 1;
      currentPhase = "Slow Start";

      // Add the point right after collapse
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "Congestion Collapse",
      });
    } else {
      // Normal TCP behavior
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        ssthresh: ssthresh,
      });

      // Update cwnd based on current phase
      if (currentPhase === "Slow Start") {
        cwnd *= 2; // Exponential growth

        // Check if we need to transition to congestion avoidance
        if (cwnd >= ssthresh) {
          currentPhase = "Congestion Avoidance";
        }
      } else {
        // Congestion avoidance - linear growth
        cwnd += 1;
      }
    }
  }

  return data;
};

/**
 * A React Chart component to visualize TCP congestion control with slow start
 * and congestion avoidance phases.
 */
export default function TCPCongestionControlChart(): JSX.Element {
  const [initialSsthresh, setInitialSsthresh] = React.useState(12);
  const [rounds, setRounds] = React.useState(16);
  const [collapseRound, setCollapseRound] = React.useState(6);
  const [showCollapse, setShowCollapse] = React.useState(true);

  const data = showCollapse
    ? generateTcpData(rounds, initialSsthresh, collapseRound)
    : generateTcpData(rounds, initialSsthresh, rounds + 1); // Set collapse beyond max rounds to avoid it

  return (
    <Card className="content-container">
      <CardHeader>
        <CardTitle className="mr-0 ml-0 w-full">
          TCP Congestion Control
        </CardTitle>
        <CardDescription className="mr-0 mb-0 ml-0 w-full">
          Visualization of TCP congestion window growth with slow start,
          congestion avoidance, and congestion collapse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <label className="mb-1 block text-sm font-medium">
              Initial Slow Start Threshold
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setInitialSsthresh(Math.max(4, initialSsthresh - 4))
                }
              >
                -
              </Button>
              <span className="w-8 text-center">{initialSsthresh}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInitialSsthresh(initialSsthresh + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <label className="mb-1 block text-sm font-medium">
              Transmission Rounds
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRounds(Math.max(15, rounds - 5))}
              >
                -
              </Button>
              <span className="w-8 text-center">{rounds}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRounds(rounds + 5)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium">
                Congestion Collapse
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollapse(!showCollapse)}
              >
                {showCollapse ? "Disable" : "Enable"}
              </Button>
            </div>
            {showCollapse && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Round: {collapseRound}</span>
                </div>
                <Slider
                  value={[collapseRound]}
                  min={5}
                  max={rounds - 5}
                  step={1}
                  onValueChange={(value) => setCollapseRound(value[0])}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <ChartContainer
          config={{
            cwnd: {
              label: "Congestion Window",
              color: "var(--chart-1)",
            },
          }}
          className="min-h-[350px] w-full"
        >
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="round"
              label={{
                value: "Transmission Round",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: "Congestion Window (cwnd)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            {/* Dynamic reference lines for ssthresh values */}
            {showCollapse && (
              <>
                <ReferenceLine
                  x={collapseRound}
                  stroke="red"
                  strokeWidth={2}
                  label={{
                    value: "Congestion Collapse",
                    position: "top",
                    fill: "red",
                  }}
                />
                <ReferenceLine
                  y={initialSsthresh}
                  stroke="orange"
                  strokeDasharray="3 3"
                  label={{
                    value: "Initial ssthresh",
                    position: "right",
                    fill: "orange",
                  }}
                />
                <ReferenceLine
                  y={Math.max(
                    2,
                    Math.floor(
                      data.find(
                        (d) =>
                          d.round === collapseRound &&
                          d.event === "Before Collapse",
                      )!.cwnd / 2,
                    ) || 2,
                  )}
                  stroke="green"
                  strokeDasharray="3 3"
                  label={{
                    value: "New ssthresh after collapse",
                    position: "right",
                    fill: "green",
                  }}
                />
              </>
            )}

            {!showCollapse && (
              <ReferenceLine
                y={initialSsthresh}
                stroke="orange"
                strokeDasharray="3 3"
                label={{
                  value: "ssthresh",
                  position: "right",
                  fill: "orange",
                }}
              />
            )}

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "cwnd")
                      return [`${value}`, "Congestion Window"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Round ${label}`}
                />
              }
            />
            <Line
              type="linear"
              dataKey="cwnd"
              stroke="var(--color-cwnd)"
              strokeWidth={2}
              dot={{
                // @ts-ignore
                fill: (entry) =>
                  entry.event === "Congestion Collapse"
                    ? "red"
                    : "var(--color-cwnd)",

                // @ts-ignore
                r: (entry) => (entry.event ? 6 : 4),
                // @ts-ignore
                stroke: (entry) =>
                  entry.event === "Congestion Collapse" ? "red" : undefined,

                // @ts-ignore
                strokeWidth: (entry) =>
                  entry.event === "Congestion Collapse" ? 2 : 0,
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
