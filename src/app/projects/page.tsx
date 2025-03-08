import * as React from "react";
import { type Metadata } from "next";

import ProjectRepoList from "./project-repo-list";
import ProjectSelectionSkeleton from "./project-section-skeleton";
import ProjectGistList from "./project-gist-list";
import { sharedMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Projects",
  description: "Projects section of Richard H. Nguyen Site",
  openGraph: {
    ...sharedMetadata.openGraph,
    title: "Projects",
    description: "Projects section of Richard H. Nguyen Site",
    url: process.env.NODE_ENV === "production" ? "/projects" : undefined,
    type: "website",
    images: [
      {
        url: "/projects.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Projects 's OG Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    title: "Projects",
    description: "Projects section of Richard H. Nguyen Site",
    images: [
      {
        url: "/projects.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Projects 's Twitter Card",
        type: "image/png",
      },
    ],
  },
};

export default async function Projects() {
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
