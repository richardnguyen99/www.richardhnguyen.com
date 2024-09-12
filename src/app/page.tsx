import * as React from "react";

import LatestArticleSection from "./components/latest-article-section";
import WebDevCategorySection from "./components/webdev-category-section";
import ProgrammingCategorySection from "./components/programming-category-section";
import ComputerNetworkCategorySection from "./components/computer-network-category-section";

const Home: React.FC = async () => {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleSection />

      <WebDevCategorySection id="web-development-section" />
      <ProgrammingCategorySection id="programming-section" />
      <ComputerNetworkCategorySection id="computer-network-section" />
    </div>
  );
};

export default Home;
