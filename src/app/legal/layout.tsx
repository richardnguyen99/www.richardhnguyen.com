import React, { type JSX } from "react";

type Props = {
  children: React.ReactNode;
};

export default function LegalLayout({ children }: Props): JSX.Element {
  return (
    <div className="mt-28 w-full">
      <section className="max-w-full">
        <div className="mx-(--gutter-size) w-(--container-size) pb-4">
          <span className="font-mono">Legal Notice</span>
        </div>

        <div className="mx-(--gutter-size) w-(--container-size)">
          {children}
        </div>
      </section>
    </div>
  );
}
