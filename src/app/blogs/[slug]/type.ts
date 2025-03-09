import { getMdxContentFromSlug } from "@/lib/mdx";

export type Params = Promise<{
  slug: string;
}>;

export type MdxPromise = ReturnType<typeof getMdxContentFromSlug>;
