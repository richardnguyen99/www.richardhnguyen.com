import * as React from "react";
import Link from "next/link";

interface BlogTagsProps {
  tags: string[];
}

const BlogTags: React.FC<BlogTagsProps> = ({ tags }) => {
  return (
    <div className="mx-[var(--article-gutter-size)] mt-6 flex w-[var(--article-container-size)] gap-4 border-t pt-6">
      <h4 className="text-base font-bold md:text-lg">Tags:</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/blogs?tags=${tag}`}>
            <span className="rounded-lg border border-neutral-400 bg-neutral-200 px-2 py-1 font-mono text-xs font-medium hover:border-neutral-500 hover:bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 lg:text-sm">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
