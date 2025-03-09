import React, { type JSX } from "react";

import BlogCodeCopyButton from "../copy-button";
import { type MetaMap } from "../../lib/shiki-options";
import extMap from "../extmap";

type BlogCodeProps = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  > &
    Omit<MetaMap, "displayLineNumbers">
>;

const getCacheFileExt = React.cache(async (lang: string | undefined) => {
  "use cache";
  const ext = extMap.get(lang || "default");

  if (!ext) {
    return extMap.get("default")!;
  }

  return ext;
});

const getCacheRawCode = React.cache(async (children: React.ReactNode) => {
  // Check if children is a code tag and contains a data-theme attribute
  if (
    !React.isValidElement(children) ||
    typeof children.props["data-theme"] !== "string"
  ) {
    throw new Error(
      "The BlogCode component must be a code tag with a data-theme attribute.",
    );
  }

  const codeTag = React.Children.toArray(children)[0] as React.ReactElement;
  let rawCode = "";

  for (const lineSpan of React.Children.toArray(codeTag.props.children)) {
    // Check if the child contains an attribute called "data-line"
    if (
      React.isValidElement(lineSpan) &&
      typeof lineSpan.props["data-line"] === "string"
    ) {
      for (const tokenSpan of React.Children.toArray(lineSpan.props.children)) {
        // Check if the child contains an attribute called "data-token"
        if (
          React.isValidElement(tokenSpan) &&
          typeof tokenSpan.props["data-token"] === "string"
        ) {
          if (typeof tokenSpan.props.children === "string") {
            // A lot of the time, the first character of a line is a
            // non-breaking space used to preserve indentation and empty lines
            if (tokenSpan.props.children.charCodeAt(0) === 173) {
              rawCode += "";
            } else {
              rawCode += tokenSpan.props.children;
            }
          }
        }
      }

      rawCode += "\n";
    }
  }

  return rawCode;
});

export default async function BlogCode({
  title,
  disableCopyButton,
  children,
  lang,
  ...rest
}: BlogCodeProps): Promise<JSX.Element> {
  const fileExt = await getCacheFileExt(lang);
  const rawCode = await getCacheRawCode(children);

  return (
    <pre data-disable-copy-button={disableCopyButton} {...rest}>
      <div className="menubar">
        <div className="filename">
          <div>{fileExt.component}</div>
          <div>{title !== "none" ? title : fileExt.text}</div>
        </div>

        {!disableCopyButton && <BlogCodeCopyButton content={rawCode} />}
      </div>
      <div className="w-full overflow-x-auto">{children}</div>
    </pre>
  );
}
