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
            className="bg-accent h-42 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>

      <div className="bg-background mx-auto mt-8 h-9 w-9 rounded-full text-center"></div>
    </div>
  );
};

export default ProjectSelectionSkeleton;
