import React, { type JSX } from "react";

import { getAllCategories, getAllTags } from "@/lib/mdx";
import FooterWrapper from "./footer";

export default async function Footer(): Promise<JSX.Element> {
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

  return <FooterWrapper categories={categories} tags={tags} />;
}
