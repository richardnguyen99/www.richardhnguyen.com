import * as React from "react";

const MarkdownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="16"
    height="16"
    {...props}
  >
    <title>markdown</title>
    <rect
      x="2.5"
      y="7.955"
      width="27"
      height="16.091"
      style={{ fill: "none", stroke: "#755838" }}
    />
    <polygon
      points="5.909 20.636 5.909 11.364 8.636 11.364 11.364 14.773 14.091 11.364 16.818 11.364 16.818 20.636 14.091 20.636 14.091 15.318 11.364 18.727 8.636 15.318 8.636 20.636 5.909 20.636"
      style={{ fill: "#755838" }}
    />
    <polygon
      points="22.955 20.636 18.864 16.136 21.591 16.136 21.591 11.364 24.318 11.364 24.318 16.136 27.045 16.136 22.955 20.636"
      style={{ fill: "#755838" }}
    />
  </svg>
);

export default MarkdownIcon;
