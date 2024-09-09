import * as React from "react";

import LatestArticleSection from "./components/latest-article-section";

const Home: React.FC = async () => {
  return (
    <div className="mt-28">
      <LatestArticleSection />
    </div>
  );
};

export default Home;
