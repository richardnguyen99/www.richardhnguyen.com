import * as React from "react";

import BlogCodeCopyButton from "./copy-button";
import { type MetaMap } from "./shiki-options";
import extMap from "./extmap";

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
  const getFileName = React.useCallback(() => {
    if (!title || title === "none") {
      return "";
    }

    return title;
  }, [title]);

  const fileExt = React.useMemo(() => {
    const ext = extMap.get(lang);

    if (!ext) {
      console.warn(`No extension found for ${lang}. Using default.`);
      return extMap.get("default")!;
    }

    return ext;
  }, [lang]);

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
        <div className="filename">
          <div>{fileExt.component}</div>
          <div>{title !== "none" ? title : fileExt.text}</div>
        </div>

        {allowCopy && <BlogCodeCopyButton text={rawCode} />}
      </div>
      {children}
    </pre>
  );
};

export default BlogCode;
