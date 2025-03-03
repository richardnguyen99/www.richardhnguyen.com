import * as React from "react";

import { getAllCategories, getAllTags } from "@/lib/mdx";
import FooterClient from "./footer-client";

const Footer: React.FC = async () => {
  const categories = Array.from((await getAllCategories()).entries())
    .map(([category, data]) => ({
      category,
      postCount: data.postCount,
      url: data.url,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  const tags = Array.from((await getAllTags()).entries())
    .map(([tag, data]) => ({
      tag,
      postCount: data.postCount,
      url: data.url,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return <FooterClient categories={categories} tags={tags} />;
};

export default Footer;
