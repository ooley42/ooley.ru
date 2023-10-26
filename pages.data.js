import { createContentLoader } from 'vitepress'

import VPMedia from './.vitepress/media'
// import { getPages } from './.vitepress/theme/composables/pages.js'

const pages = createContentLoader('./**/*/*.md', {
  // includeSrc: true,
  transform: VPMedia({
    root: new URL('./', import.meta.url),
    mediaTypes: {
      cover: { size: 1200, height: 1000, fit: "inside" },
      icon: { size: 400, height: 400, fit: "inside" },
    }
  })
})

// import fs from 'node:fs'
// fs.writeFileSync('./pages.json', JSON.stringify(await pages.load(), null, 2))

export default pages