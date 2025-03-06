import React, { type JSX } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Projects({ children }: Props): JSX.Element {
  return (
    <div className="mt-28 w-full">
      <section className="max-w-full">
        <div className="mx-[var(--gutter-size)] flex w-[var(--container-size)] flex-col items-center pb-4">
          <span className="font-mono">About Richard H. Nguyen</span>
        </div>

        {children}
      </section>
    </div>
  );
}
