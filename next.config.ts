import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
  },
  cacheComponents: true,
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    webpackMemoryOptimizations: true,
  },
  async redirects() {
    return [
      {
        source: "/about-me",
        destination: "/about-me/bio",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-me/bio",
        permanent: true,
      },
    ];
  },
};

// const withMDX = createMDX({
//   extension: /\.(md|mdx)$/,
//   options: {
//     rehypePlugins,
//     remarkPlugins,
//     format: "mdx",
//   },
// });

// Merge MDX config with Next.js config
// export default withMDX(nextConfig);
export default nextConfig;
