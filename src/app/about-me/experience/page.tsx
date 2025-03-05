import React, { type JSX } from "react";
import Tabs from "../tabs";

export default function Experience(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-5xl font-semibold leading-[110%] tracking-tight">
        Work Experience
      </h1>

      <Tabs activeTab="exp">
        <p>
          I am a software engineer with a passion for web development. I
          specialize in building websites and web applications using modern
          technologies like React, Next.js, and TypeScript.
        </p>
      </Tabs>
    </div>
  );
}
