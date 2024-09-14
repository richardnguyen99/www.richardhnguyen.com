import * as React from "react";
import Link from "next/link";

import LatestArticleSection from "./components/latest-article-section";
import WebDevCategorySection from "./components/webdev-category-section";
import ProgrammingCategorySection from "./components/programming-category-section";
import ComputerNetworkCategorySection from "./components/computer-network-category-section";
import APICategorySection from "./components/api-category-section";

const Home: React.FC = async () => {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleSection />

      <WebDevCategorySection id="web-development-section" />
      <APICategorySection id="api-section" />
      <ProgrammingCategorySection id="programming-section" />
      <ComputerNetworkCategorySection id="computer-network-section" />

      <div className="mt-12 max-w-full md:mt-20 lg:mt-28">
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
