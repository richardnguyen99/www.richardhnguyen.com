import React, { type JSX } from "react";

import { getMdxContentsWithFilter } from "@/lib/mdx";
import LatestArticleCard from "./latest-article-card";

export default async function LatestArticleSection(): Promise<JSX.Element> {
  const contents = await getMdxContentsWithFilter(3, "desc");

  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 lg:grid-rows-2">
      <LatestArticleCard
        frontMatter={contents[0].frontMatter}
        className="lg:col-span-8 lg:row-span-2 lg:row-start-1"
      />
      <LatestArticleCard
        frontMatter={contents[1].frontMatter}
        className="md:col-span-6 lg:col-span-4 lg:row-span-1 lg:row-start-1"
      />
      <LatestArticleCard
        frontMatter={contents[2].frontMatter}
        className="md:col-span-6 lg:col-span-4 lg:row-span-1 lg:row-start-2"
      />
    </div>
  );
}
