import * as React from "react";

import LatestArticleSection from "./components/latest-article-section";
import WebDevCategorySection from "./components/webdev-category-section";

const Home: React.FC = async () => {
  return (
    <div className="mt-28 max-w-full">
      <LatestArticleSection />
      <React.Suspense fallback={<div>Loading...</div>}>
        <WebDevCategorySection />
      </React.Suspense>
    </div>
  );
};

export default Home;
