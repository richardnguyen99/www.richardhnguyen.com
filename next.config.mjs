/** @type {import('next').NextConfig} */
const nextConfig = {
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
