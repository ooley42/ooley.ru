import { defineConfig } from "vitepress";

import { metaData } from "./constants.js";
import head from "./head.js";

import mdLinks from "markdown-it-external-links";
import mdClass from "markdown-it-classy";
import mdContainer from "markdown-it-container";

export default defineConfig({
  base: "/ooley.ru/",
  title: metaData.title,
  description: metaData.description,
  lang: metaData.locale,
  head,
  outDir: "_dist",
  themeConfig: {
    repo: "",
    logo: metaData.logo,
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 300000,
    },
  },
  markdown: {
    config: (md) => {
      // md.use(mdClass);
      md.use(mdContainer, "card");
      md.use(mdLinks, {
        internalDomains: ["localhost", "frkt.ru"],
      });
    },
  },
});
