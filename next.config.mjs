import createNextIntlPlugin from "next-intl/plugin";
import nextMdx from "@next/mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const withNextIntl = createNextIntlPlugin("./i18/request.ts");

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
  },
});

const nextConfig = withMdx({
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  transpilePackages: ["next-mdx-remote"],
});

export default withNextIntl(nextConfig);
