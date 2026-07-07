import React, { JSX } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import mdxComponents from "@/components/mdx-components";
import rehypePlugins from "@/lib/rehype";
import remarkPlugins from "@/lib/remark";

interface MdxRemoteClientProps {
  body: string;
}

export default function MdxRemoteClient({
  body,
}: MdxRemoteClientProps): JSX.Element {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MDXRemote
        source={body}
        components={mdxComponents}
        options={{
          scope: {},
          mdxOptions: {
            useDynamicImport: true,
            rehypePlugins,
            remarkPlugins,
            format: "mdx",
          },
        }}
      />
    </React.Suspense>
  );
}
