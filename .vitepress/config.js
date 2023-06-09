import { defineConfig } from "vitepress";

import mdLinks from "markdown-it-external-links";
import mdContainer from "markdown-it-container";

import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

import generateMeta from 'vitepress-pages/head'

const links = []

export const metaData = {
  title: "OOLEY",
  description: "Центр открытых мастерских",
  site: "ooley.ru",
  url: "https://ooley.ru/",
  repo: "https://github.com/DeFUCC/fondfrukt.ru",
  locale: "ru",
  icon: "favicon.svg",
  logo: "/logo/pill.svg",
  image: "images/build/zdaniya-05.png",
  color: '#cccccc',
  mediaFolder: 'media_files',
  author: "davay42",
  tags: "мастерская, коворкинг, каталог, карта, творчество, проекты, общественная мастерская, открытая мастерская, свободное творчество",
  umamiId: "c6241f96-da4c-4083-8868-74834541e83",
  umamiScript: "https://stats.defucc.me/umami.js"
};


export default defineConfig({
  title: metaData.title,
  description: metaData.description,
  lang: metaData.locale,
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
  transformHead: generateMeta(metaData),
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath?.replace(/((^|\/)index)?\.md$/, '$2'),
        lastmod: pageData?.lastUpdated,
        changefreq: 'weekly'
      })
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: metaData.url })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
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
