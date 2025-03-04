import React from "react";

import ProjectList from "./project-list";
import getPinnedRepos from "@/lib/github";

export default async function ProjectRepoList() {
  const data = await getPinnedRepos();

  return (
    <ProjectList
      title="Repositories"
      initialData={data.data.repositoryOwner.repos.nodes.map((repo) => ({
        id: repo.id,
        title: repo.name,
        url: repo.url,
        starCounts: repo.stargazerCount,
        forkCounts: repo.forkCount,
        pinned: true,
        description: repo.description,
        demoUrl: repo.homepageUrl,
      }))}
    />
  );
}
