/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
  },
  transpilePackages: ["next-mdx-remote"],
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

export default nextConfig;
