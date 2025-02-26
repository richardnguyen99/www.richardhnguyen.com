export type SortOrder = "asc" | "desc";

export interface ChangeLog {
  readonly date: Date;
  readonly changes: Array<string>;
}

export interface FrontMatter {
  readonly title: string;
  readonly slug: string;
  readonly date: Date;
  readonly published: boolean;
  readonly publishedAt: Date;
  readonly author: string;
  readonly tags: string[];
  readonly category: string;
  readonly thumbnail: string;
  readonly changeLog: Array<ChangeLog>;
}

export interface MdxContent {
  readonly frontMatter: FrontMatter;
  readonly excerpt?: string;
  readonly body: string;
}
