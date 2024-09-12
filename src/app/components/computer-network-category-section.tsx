import * as React from "react";

import { type FrontMatter, getMdxContentsWithFilter } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import CategoryCarousel from "./category-carousel";

type Props = React.PropsWithChildren<{} & React.HTMLAttributes<HTMLDivElement>>;

const ComputerNetworkCategorySection: React.FC<Props> = async ({
  className,
  ...rest
}) => {
  const mdxContents = await getMdxContentsWithFilter(
    10,
    "desc",
    (mdxContent) => mdxContent.frontMatter.category === "computer-network",
  );

  const metadatas = mdxContents.map((content) => ({
    ...content.frontMatter,
    excerpt: content.excerpt,
  })) as (FrontMatter & { excerpt: string | null })[];

  return (
    <section {...rest} className={cn("mt-28 max-w-full", className)}>
      <CategoryCarousel
        sectionHeading="Computer Network"
        metadatas={metadatas}
      />
    </section>
  );
};

export default ComputerNetworkCategorySection;
