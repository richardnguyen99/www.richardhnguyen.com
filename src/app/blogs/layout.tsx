import React, { type JSX } from "react";

type Props = {
  children: React.ReactNode;
};

export default function BlogsLayout({ children }: Props): JSX.Element {
  return (
    <div className="mt-8 w-screen max-w-full sm:mt-12 md:mt-20 lg:mt-28">
      <React.Suspense fallback={null}>{children}</React.Suspense>
    </div>
  );
}
