type RepositoryTopic = {
  url: string;
  id: string;
};

type RepositoryTopicEdge = {
  cursor: string;
  node: RepositoryTopic;
};

type RepositoryTopicConnection = {
  edges: RepositoryTopicEdge[];
  nodes: RepositoryTopic[];
  totalCount: number;
};

type Gist = {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
  stargazerCount: number;
  url: string;
};

type GistEdge = {
  cursor: string;
  node: Gist;
};

type GistConnection = {
  edges: GistEdge[];
  nodes: Gist[];
  totalCount: number;
};

type Repository = {
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

type PinnableItem = Gist & Repository;

type PinnableItemEdge = {
  cusor: string;
  node: PinnableItem;
};

type PinnableItemConnection = {
  edges: PinnableItemEdge[];
  nodes: PinnableItem[];
  totalCount: number;
};

type Organization = {};

type User = {
  pinnedItems: PinnableItemConnection;
};

type RepositoryOwner = Organization & User;

export type Queries = {
  repositoryOwner: RepositoryOwner;
};
