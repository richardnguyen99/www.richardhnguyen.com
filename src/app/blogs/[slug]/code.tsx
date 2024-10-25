import * as React from "react";

import BlogCodeCopyButton from "./copy-button";
import { type MetaMap } from "./shiki-options";
import extMap from "./extmap";

type BlogCodeProps = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  > &
    Omit<MetaMap, "displayLineNumbers">
>;

const BlogCode: React.FC<BlogCodeProps> = ({
  title,
  disableCopyButton,
  children,
  lang,
  rawCode,
  ...rest
}) => {
  const fileExt = React.useMemo(() => {
    const ext = extMap.get(lang || "default");

    if (!ext) {
      return extMap.get("default")!;
    }

    return ext;
  }, [lang]);

  return (
    <pre {...rest}>
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
};

export default BlogCode;
