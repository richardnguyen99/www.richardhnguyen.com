import * as React from "react";

import BlogCodeCopyButton from "./copy-button";
import { type MetaMap } from "./shiki-options";

type BlogCodeProps = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  > &
    MetaMap
>;

const BlogCode: React.FC<BlogCodeProps> = ({
  title,
  displayLineNumbers,
  allowCopy,
  children,
  lang,
  rawCode,
  ...rest
}) => {
  return (
    <pre
      /* Prepend `data-` prefix to custom properties so that NextJS will
          pass gracefully. Use `Boolean.toString()` to force write `false`
          values since CSS uses them. */
      data-allow-copy={new Boolean(allowCopy).toString()}
      data-display-line-numbers={new Boolean(displayLineNumbers).toString()}
      data-title={title}
      data-lang={lang}
      {...rest}
    >
      <div className="menubar">
        <div className="filename">{title !== "none" ? title : null}</div>

        {allowCopy && <BlogCodeCopyButton text={rawCode} />}
      </div>
      {children}
    </pre>
  );
};

export default BlogCode;
