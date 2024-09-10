import * as React from "react";

import { type FrontMatter, getMdxContentsWithFilter } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import WebDevCategoryCarousel from "./wedev-category-carousel";

type Props = React.PropsWithChildren<{} & React.HTMLAttributes<HTMLDivElement>>;

const WebDevCategorySection: React.FC<Props> = async ({
  className,
  ...rest
}) => {
  const frontMatters: FrontMatter[] = (
    await getMdxContentsWithFilter(-1, "desc")
  ).map((mdxContent) => mdxContent.frontMatter);

  return (
    <section {...rest} className={cn("mt-28 max-w-full", className)}>
      <WebDevCategoryCarousel frontMatters={frontMatters} />
    </section>
  );
};

export default WebDevCategorySection;
