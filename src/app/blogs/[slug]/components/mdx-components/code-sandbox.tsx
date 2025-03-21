"use client";

import React, { type JSX } from "react";

type Props = {
  src: string;
  title: string;
};

export default function CodeSandbox({ src, title }: Props): JSX.Element {
  const ref = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const id = setTimeout(() => {
      ref.current?.classList.remove("hidden");
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="content-container h-[480px] overflow-auto lg:mx-[var(--gutter-size)] lg:h-[678px] lg:w-[var(--container-size)]">
      <iframe
        ref={ref}
        src={src}
        className="hidden h-full w-full border-0 border-none"
        title={title}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
