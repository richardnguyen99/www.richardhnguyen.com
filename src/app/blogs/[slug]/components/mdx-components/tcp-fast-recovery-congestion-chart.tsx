"use client";

import React, { type JSX } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PhaseType = "Slow Start" | "Congestion Avoidance" | "Fast Recovery";
type EventType =
  | "Sending"
  | "Before 3 Duplicate ACKs"
  | "3 Duplicate ACKs"
  | "Before Collapse"
  | "Congestion Collapse";

type TcpData = {
  round: number;
  cwnd: number;
  phase: PhaseType;
  ssthresh: number;
  event: EventType;
};

const MAX_ROUNDS = 40;
const COLLAPSE_ROUND = 24;
const TRIP_DUPACK_ROUND = 16;
const INITIAL_SSTHRESH = 16;

// Generate TCP congestion control data with congestion collapse
const generateTcpData = () => {
  const data: TcpData[] = [];
  let cwnd = 1; // Initial congestion window size
  let ssthresh = INITIAL_SSTHRESH;
  let currentPhase: PhaseType = "Slow Start";
  let maxCwnd = cwnd;

  const phaseRounds: Array<{
    startRound: number;
    endRound: number;
    phase: PhaseType;
  }> = [];

  let startPhaseRound = 0;

  for (let round = 1; round <= MAX_ROUNDS; round++) {
    // Check if congestion collapse occurs at this round
    if (round === COLLAPSE_ROUND) {
      // Set new ssthresh to half of current cwnd (minimum 2)
      ssthresh = cwnd > 2 ? Math.floor(cwnd / 2) : 2;

      // Add the point right before collapse
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "Before Collapse",
        ssthresh: ssthresh,
      });
      phaseRounds.push({
        startRound: startPhaseRound,
        endRound: round,
        phase: currentPhase,
      });

      // Reset cwnd to 1 after collapse
      maxCwnd = Math.max(maxCwnd, cwnd);
      cwnd = 1;
      currentPhase = "Slow Start";
      startPhaseRound = round;

      // Add the point right after collapse
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "Congestion Collapse",
        ssthresh: ssthresh,
      });
    } else if (round === TRIP_DUPACK_ROUND) {
      // 3 Duplicate ACKs event
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "Before 3 Duplicate ACKs",
        ssthresh: ssthresh,
      });
      phaseRounds.push({
        startRound: startPhaseRound,
        endRound: round - 1,
        phase: currentPhase,
      });
      ssthresh = Math.max(2, Math.floor(cwnd / 2));

      startPhaseRound = round - 1;
      // Fast Recovery
      maxCwnd = Math.max(maxCwnd, cwnd);
      cwnd = ssthresh + 3;
      currentPhase = "Fast Recovery";

      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        event: "3 Duplicate ACKs",
        ssthresh: ssthresh,
      });
    } else {
      // Normal TCP behavior
      data.push({
        round: round,
        cwnd: cwnd,
        phase: currentPhase,
        ssthresh: ssthresh,
        event: "Sending",
      });

      // Update cwnd based on current phase
      maxCwnd = Math.max(maxCwnd, cwnd);
      if (currentPhase === "Slow Start") {
        cwnd *= 2; // Exponential growth

        // Check if we need to transition to congestion avoidance
        if (cwnd >= ssthresh) {
          phaseRounds.push({
            startRound: startPhaseRound,
            endRound: cwnd === ssthresh ? round : round + 1,
            phase: currentPhase,
          });

          currentPhase = "Congestion Avoidance";
          startPhaseRound = cwnd === ssthresh ? round : round + 1;
        }
      } else {
        // Congestion avoidance - linear growth
        cwnd += 1;
      }
    }

    if (round === MAX_ROUNDS) {
      phaseRounds.push({
        startRound: startPhaseRound,
        endRound: round + 1,
        phase: currentPhase,
      });
    }
  }

  return [data, phaseRounds, maxCwnd] as const;
};

/**
 * A React Chart component to visualize TCP congestion control with slow start,
 * congestion avoidance and fast recovery phases.
 */
export default function TCPFastRecoveryCongestionControlChart(): JSX.Element {
  const data = React.useMemo(() => generateTcpData(), []);

  const newSsthresh = React.useMemo(
    () =>
      Math.max(
        2,
        Math.floor(
          data[0].find(
            (d) => d.round === COLLAPSE_ROUND && d.event === "Before Collapse",
          )!.cwnd / 2,
        ) || 2,
      ),
    [data],
  );

  return (
    <Card className="content-container">
      <CardHeader>
        <CardTitle className="mr-0 ml-0 w-full">
          TCP Congestion Control With Fast Recovery
        </CardTitle>
        <CardDescription className="mr-0 mb-0 ml-0 w-full">
          Visualization of TCP congestion window growth with slow start,
          congestion avoidance, and fast recovery phases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer className="overflow-x-auto">
          <ChartContainer
            config={{
              cwnd: {
                label: "Congestion Window",
                color: "var(--chart-1)",
              },
            }}
            className="min-h-[350px] [&_tspan]:whitespace-pre-wrap"
          >
            <LineChart
              data={data[0]}
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

              {data[1].map(({ startRound, endRound, phase }, i) => (
                <ReferenceArea
                  key={i}
                  x1={startRound}
                  x2={endRound}
                  y1={0}
                  y2={data[2]}
                  stroke={
                    phase === "Slow Start"
                      ? "var(--chart-3)"
                      : phase === "Congestion Avoidance"
                        ? "var(--chart-4)"
                        : "var(--chart-5)"
                  }
                  strokeOpacity={0.3}
                  fill={
                    phase === "Slow Start"
                      ? "var(--chart-3)"
                      : phase === "Congestion Avoidance"
                        ? "var(--chart-4)"
                        : "var(--chart-5)"
                  }
                  fillOpacity={0.2}
                  label={{
                    value: phase,

                    position: "insideBottomRight",
                    fill:
                      phase === "Slow Start"
                        ? "var(--chart-3)"
                        : phase === "Congestion Avoidance"
                          ? "var(--chart-4)"
                          : "var(--chart-5)",
                  }}
                ></ReferenceArea>
              ))}

              <ReferenceLine
                x={TRIP_DUPACK_ROUND - 1}
                stroke="var(--chart-5)"
                strokeWidth={2}
                label={{
                  value: "3 duplicate ACKs",
                  position: "top",
                  fill: "red",
                }}
              />
              <ReferenceLine
                x={COLLAPSE_ROUND}
                stroke="red"
                strokeWidth={2}
                label={{
                  value: "Timeout",
                  position: "top",
                  fill: "red",
                }}
              />
              <ReferenceLine
                y={INITIAL_SSTHRESH}
                stroke="orange"
                strokeDasharray="3 3"
                label={{
                  value: "Initial ssthresh",
                  position: "insideTopRight",
                  fill: "orange",
                }}
              />
              <ReferenceLine
                y={newSsthresh}
                stroke="green"
                strokeDasharray="3 3"
                label={{
                  value: "New ssthresh after collapse",
                  position: "insideTopRight",
                  fill: "green",
                }}
              />

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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
