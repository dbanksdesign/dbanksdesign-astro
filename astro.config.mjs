// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://dbanks.design",
  markdown: {
    syntaxHighlight: "prism",
  },
  vite: {
    ssr: {
      noExternal: ["@astrojs/prism"],
    },
  },
  integrations: [
    // expressiveCode({
    //   themes: [theme, nightOwl],
    // }),
    mdx(),
    sitemap(),
    preact(),
  ],
});
