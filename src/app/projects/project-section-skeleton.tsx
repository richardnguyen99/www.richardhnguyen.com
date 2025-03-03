import React from "react";

type Props = {
  title: string;
};

const ProjectSelectionSkeleton: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex flex-col">
      <h3 className="mb-6 font-mono text-xl uppercase">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-rows-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-[168px] animate-pulse rounded-lg bg-accent"
          ></div>
        ))}
      </div>

      <div className="mx-auto mt-8 h-9 w-9 rounded-full bg-background text-center"></div>
    </div>
  );
};

export default ProjectSelectionSkeleton;
