// next.config.mjs
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
import nextMdx from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./i18/request.ts");

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const baseConfig = {
  // recognize .md/.mdx alongside your TS/JS files
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],

  // if you’re shipping next-mdx-remote or other packages un-transpiled
  transpilePackages: ["next-mdx-remote"],

  // make sure Next.js *also* snapshots your content folder
  experimental: {
    outputFileTracingRoots: [
      // always include your project root
      path.resolve(__dirname),
      // explicitly include the `/content` directory
      path.join(path.resolve(__dirname), "content"),
    ],
  },

  // (optional) if you have custom rewrites or i18n locales
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
    localeDetection: false,
  },

  // serve your robots.txt from /public so it doesn't hit your dynamic route
  // no need to configure here, just drop public/robots.txt in your repo
};

export default withNextIntl(withMdx(baseConfig));
