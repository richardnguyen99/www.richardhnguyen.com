import * as React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
};

type Props = {
  children: React.ReactNode;
};

const Blog: React.FC<Props> = async ({ children }) => {
  return (
    <div className="mt-8 w-screen max-w-full sm:mt-12 md:mt-20 lg:mt-28">
      <React.Suspense fallback={<div>Loading...</div>}>
        {children}
      </React.Suspense>
    </div>
  );
};

export default Blog;
