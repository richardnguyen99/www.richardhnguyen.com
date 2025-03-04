import React from "react";

import ProjectList from "./project-list";
import getPinnedRepos from "@/lib/github";

const ProjectGistList: React.FC = async () => {
  const data = await getPinnedRepos();

  return (
    <ProjectList
      title="Gists"
      type="gist"
      initialData={data.data.repositoryOwner.gists.nodes.map((gist) => ({
        id: gist.id,
        title: gist.files[0].name,
        url: gist.url,
        starCounts: gist.stargazerCount,
        forkCounts: 0,
        pinned: false,
        description: gist.description,
        demoUrl: gist.url,
      }))}
    />
  );
};

export default ProjectGistList;
