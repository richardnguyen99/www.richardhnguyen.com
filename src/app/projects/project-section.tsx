"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import ProjectCard from "./project-card";

type Props = {
  title: string;
  type: "gist" | "repo";
  initialProjects: {
    title: string;
    url: string;
    starCounts: number;
    forkCounts: number;
    pinned: boolean;
    description: string | null;
    demoUrl: string | null;
  }[];
};

const ProjectSection: React.FC<Props> = ({ title, initialProjects }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="mb-6 font-mono text-xl uppercase">{title}</h3>
      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3"
      >
        {initialProjects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>

      <Button
        variant="default"
        className="mx-auto mt-8 w-fit rounded-full text-center"
        onClick={handleClick}
      >
        Load more
      </Button>
    </div>
  );
};

export default ProjectSection;
