import { defineConfig } from "vitepress";

import { metaData } from "./constants.js";
import head from "./head.js";

import mdLinks from "markdown-it-external-links";
import mdClass from "markdown-it-classy";
import mdContainer from "markdown-it-container";

const isProd = process.env.NODE_ENV === "production";
const site = isProd ? "https://ooley.ru/" : "http://localhost:3000";

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
  transformHead(ctx) {
    const url = ctx.pageData.relativePath.split('index.md')[0]
    let image = metaData?.image
    if (ctx.pageData.frontmatter?.cover) {
      image = 'media_files/cover/' + url.split('/').join('-') + ctx.pageData.frontmatter?.cover
    }
    return [
      ['meta', { property: 'og:title', content: ctx.pageData?.title + ' | OOLEY' }],
      ['meta', { property: 'og:description', content: ctx.pageData?.description }],
      ['meta', { property: 'og:url', content: site + url }],
      ['meta', { property: 'og:image', content: site + image }],
      ['meta', { name: 'twitter:title', content: ctx.pageData.title + ' | OOLEY' }],
      ['meta', { name: 'twitter:description', content: ctx.pageData.description }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: `@${metaData?.author}` }],
      ['meta', { name: 'twitter:creator', content: `@${metaData?.author}` }],
      ['meta', { name: 'twitter:image', content: site + image }],
    ]
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
        internalDomains: ["localhost", "ooley.ru"],
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
