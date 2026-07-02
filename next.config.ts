import createMDX from "@next/mdx";

import rehypePlugins from "./src/lib/rehype";
import remarkPlugins from "./src/lib/remark";

const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
  },
  cacheComponents: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins,
    remarkPlugins,
    format: "mdx",
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
