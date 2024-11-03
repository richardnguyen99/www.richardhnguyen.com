import * as React from "react";
import Image from "next/image";

const CodeSandbox: React.FC<{ src: string; title: string }> = ({
  src,
  title,
}) => {
  return (
    <div className="content-container lg:mx-[var(--gutter-size)] lg:w-[var(--container-size)]">
      <iframe
        title={title}
        className="mb-4 min-h-[480px] w-full lg:min-h-[678px]"
        src={src}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
      <a
        title={`Edit ${src} on CodeSandbox`}
        href={src}
        className="relative inline-block h-12 w-48"
        target="_blank"
      >
        <Image
          alt="Edit react-sanbox"
          src="https://codesandbox.io/static/img/play-codesandbox.svg"
          fill
        />
      </a>
    </div>
  );
};

export default CodeSandbox;
