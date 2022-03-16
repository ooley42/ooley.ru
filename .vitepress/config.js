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
    color: '#f9a02c',
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
      md.use(mdLinks, {
        internalDomains: ["localhost", "frkt.ru"],
      });

      md.use(mdContainer, "slides", {
        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^stanza\s+(.*)$/);

          if (tokens[idx].nesting === 1) {
            let text = md.utils.escapeHtml(m?.[1] || "");
            let tag = "";
            if (text)
              tag = `<a href="#s${text}" id="s${text}" class="num" >${text}</a>`;
            // opening tag
            return `<div class="slides">${tag}
            `;
          } else {
            // closing tag
            return "</div>\n";
          }
        },
      });
    },
  },
});
