import { defineConfig } from "vitepress";

import { metaData } from "./constants.js";
import head from "./head.js";

import mdLinks from "markdown-it-external-links";
import mdClass from "markdown-it-classy";
import mdContainer from "markdown-it-container";

export default defineConfig({
  title: metaData.title,
  description: metaData.description,
  lang: metaData.locale,
  head,
  outDir: "_dist",
  themeConfig: {
    repo: "",
    logo: metaData.logo,
    social: {
      tel: '+7 (963) 979-02-04',
      email: 'o@ooley.ru',
      vk: 'ooley42',
      instagram: 'ooley42',
      github: 'ooley42'
    }
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
