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
  cursor: string;
  node: PinnableItem;
};

export type PinnableItemConnection = {
  edges: PinnableItemEdge[];
  nodes: PinnableItem[];
  totalCount: number;
};

export type User = {
  pinnedItems: PinnableItemConnection;
};

export type RepositoryOwner = User;

export type Queries = {
  repositoryOwner: RepositoryOwner;
};

export type GitUser = {
  name: string;
  email: string;
  date: string;
};

export type Verification = {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
  verified_at: string | null;
};

export type CommitData = {
  url: string;
  author: GitUser | null;
  committer: GitUser | null;
  message: string;
  comment_count: number;
  tree: {
    sha: string;
    url: string;
  };
  verification: Verification;
};

export type SimpleUser = {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at: string;
  user_view_type: string;
};

export type CommitParent = {
  sha: string;
  url: string;
  html_url: string;
};

export type DiffEntry = {
  sha: string | null;
  filename: string;
  status:
    | "added"
    | "removed"
    | "modified"
    | "renamed"
    | "copied"
    | "changed"
    | "unchanged";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch: string;
  previous_filename: string;
};

export type Commit = {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: CommitData;
  author: SimpleUser | null;
  committer: SimpleUser | null;
  parents: CommitParent[];
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: DiffEntry[];
};
