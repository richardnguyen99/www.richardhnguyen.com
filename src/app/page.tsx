import * as React from "react";
import Link from "next/link";

import LatestArticleSection from "./components/latest-article-section";
import CategorySection from "./components/category-section";

const Home: React.FC = async () => {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleSection />

      <CategorySection title="API Design" category="api" />
      <CategorySection title="Programming" category="programming" />
      <CategorySection title="Computer Network" category="computer-network" />
      <CategorySection title="Web Development" category="web-development" />

      <div className="mt-6 max-w-full sm:mt-8 md:mt-12 lg:mt-20">
        <div className="container flex items-center justify-center">
          <Link
            href="/blogs"
            className="flex w-full max-w-full items-center justify-center rounded-full bg-black px-6 py-4 text-white lg:max-w-[280px]"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
