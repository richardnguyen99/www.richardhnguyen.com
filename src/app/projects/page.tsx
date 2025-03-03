import * as React from "react";

import ProjectRepoList from "./project-repo-list";
import ProjectSelectionSkeleton from "./project-section-skeleton";
import ProjectGistList from "./project-gist-list";

export const dynamic = "force-dynamic";

export default function Projects() {
  return (
    <div className="mt-28 w-full">
      <section className="max-w-full">
        <div className="mx-[var(--gutter-size)] flex w-[var(--container-size)] flex-col items-center pb-16">
          <span className="font-mono">Richard H. Nguyen</span>
          <h1 className="text-5xl font-semibold leading-[110%] tracking-tight">
            My projects
          </h1>
        </div>

        <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
          <React.Suspense
            fallback={<ProjectSelectionSkeleton title="Repositories" />}
          >
            <ProjectRepoList />
          </React.Suspense>
          <React.Suspense
            fallback={<ProjectSelectionSkeleton title="Repositories" />}
          >
            <ProjectGistList />
          </React.Suspense>
        </div>
      </section>
    </div>
  );
}
