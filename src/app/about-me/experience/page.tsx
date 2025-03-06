import React, { type JSX } from "react";
import Tabs from "../tabs";
import Timeline from "./timeline";

export default function Experience(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-5xl font-semibold leading-[110%] tracking-tight">
        Work Experience
      </h1>

      <Tabs activeTab="exp">
        <p>
          I graduatedd from{" "}
          <a
            href="https://www.highline.edu/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Highline College
          </a>{" "}
          with an Associate of Applied Science in Computer Science in 2021, and
          from{" "}
          <a
            href="https://www.seattleu.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seattle University
          </a>{" "}
          with a bachelor&apos;s degree in Computer Science in 2023.
        </p>

        <Timeline className="mt-8" />
      </Tabs>
    </div>
  );
}
