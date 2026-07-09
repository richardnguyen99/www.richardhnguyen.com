import { getMdxContentFromSlug } from "@/lib/mdx";

export type Params = Promise<{
  slug: string;
}>;

export type Changelog = Array<{
  url: string;
  date: string | null;
  author: string | null;
  message: string;
}>;

export type MdxPromise = ReturnType<typeof getMdxContentFromSlug>;
