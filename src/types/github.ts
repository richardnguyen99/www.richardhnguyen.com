export type File = {
  text: string;
  name: string;
  size: number;
  extension: string;
  language: string;
  encoding: string;
  encodedName: string;
};

export type RepositoryTopic = {
  url: string;
  id: string;
};

export type RepositoryTopicEdge = {
  cursor: string;
  node: RepositoryTopic;
};

export type RepositoryTopicConnection = {
  edges: RepositoryTopicEdge[];
  nodes: RepositoryTopic[];
  totalCount: number;
};

export type Gist = {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
  stargazerCount: number;
  url: string;
  files: File[];
};

export type GistEdge = {
  cursor: string;
  node: Gist;
};

export type GistConnection = {
  edges: GistEdge[];
  nodes: Gist[];
  totalCount: number;
};

export type Repository = {
  name: string;
  description: string | null;
  descriptionHTML: string | null;
  forkCount: number;
  homepageUrl: string | null;
  id: string;
  stargazerCount: number;
  repositoryTopics: RepositoryTopicConnection;
  url: string;
};

export type PinnableItem = Gist & Repository;

export type PinnableItemEdge = {
  cusor: string;
  node: PinnableItem;
};

export type PinnableItemConnection = {
  edges: PinnableItemEdge[];
  nodes: PinnableItem[];
  totalCount: number;
};

export type Organization = {};

export type User = {
  pinnedItems: PinnableItemConnection;
};

export type RepositoryOwner = Organization & User;

export type Queries = {
  repositoryOwner: RepositoryOwner;
};
