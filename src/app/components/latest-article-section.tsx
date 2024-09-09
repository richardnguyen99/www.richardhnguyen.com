import * as React from "react";

import { getMdxContentsWithFilter } from "@/lib/mdx";
import LatestArticleCard from "./latest-article-card";

const LatestArticleSection: React.FC = async () => {
  const contents = await getMdxContentsWithFilter(3, "desc");

  return (
    <section className="w-screen">
      <div className="flex flex-col items-center pb-16">
        <span className="font-mono">Richard H. Nguyen</span>
        <h1 className="text-5xl font-semibold leading-[110%] tracking-tight">
          Latest Posts
        </h1>
      </div>

      <div className="container col-span-12 mx-auto grid grid-cols-12 gap-4 lg:grid-rows-2">
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
    </section>
  );
};

export default LatestArticleSection;
