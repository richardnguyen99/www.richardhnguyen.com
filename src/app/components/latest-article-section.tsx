import * as React from "react";

import { getMdxContentsWithFilter } from "@/lib/mdx";
import LatestArticleCard from "./latest-article-card";

const LatestArticleSection: React.FC = async () => {
  const contents = await getMdxContentsWithFilter(3, "desc");

  return (
    <section className="w-screen max-w-full">
      <div className="flex flex-col items-center pb-16">
        <span className="font-mono">Richard H. Nguyen</span>
        <h1 className="text-5xl font-semibold leading-[110%] tracking-tight">
          Latest Posts
        </h1>
      </div>

      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
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
      </div>
    </section>
  );
};

export default LatestArticleSection;
