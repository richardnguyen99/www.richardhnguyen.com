"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProjectCard from "./project-card";

type Project = {
  id: string;
  title: string;
  url: string;
  starCounts: number;
  forkCounts: number;
  pinned: boolean;
  description: string | null;
  demoUrl: string | null;
};

type Props = {
  title: string;
  initialData: Project[];
  type?: "gist" | "repo";
};

const SKELETON_COUNT = 6; // Number of skeleton cards to show while loading

async function fetchGithubRepos(
  username: string,
  page: number,
  type: "gist" | "repo",
  perPage: number = 6,
) {
  const response = await fetch(
    `https://api.github.com/users/${username}/${type}s?page=${page}&per_page=${perPage}&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  const repos = await response.json();
  return repos.map((repo: any) => ({
    title: repo.name,
    url: repo.html_url,
    starCounts: repo.stargazers_count,
    forkCounts: repo.forks_count,
    pinned: false, // GitHub API doesn't provide pinned status
    description: repo.description,
    demoUrl: repo.homepage || null,
  }));
}

export default function ProjectList({
  title,
  initialData,
  type = "repo",
}: Props) {
  const [projects, setProjects] = React.useState<Project[]>(initialData);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const joinProjectsWithoutDuplicates = React.useCallback(
    (prevProjs: Project[], newProjs: Project[]) => {
      const newProjects = newProjs.filter(
        (newProject) =>
          !prevProjs.some((prevProject) => prevProject.url === newProject.url),
      );
      return [...prevProjs, ...newProjects];
    },
    [],
  );

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newProjects = await fetchGithubRepos(
        process.env.NEXT_PUBLIC_GITHUB_USER_NAME as string,
        nextPage,
        type,
      );

      if (newProjects.length === 0) {
        setHasMore(false);
      } else {
        setProjects((prev) => joinProjectsWithoutDuplicates(prev, newProjects));
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, type, joinProjectsWithoutDuplicates]);

  return (
    <div className="flex flex-col">
      <h3 className="mb-6 font-mono text-xl uppercase">{title}</h3>
      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div
              key={index}
              className="h-[168px] animate-pulse rounded-lg bg-accent"
            />
          ))}
      </div>

      <Button
        ref={buttonRef}
        variant="default"
        className="mx-auto mt-8 w-fit rounded-full text-center"
        onClick={handleClick}
        disabled={isLoading || !hasMore}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}
