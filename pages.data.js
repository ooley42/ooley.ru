import { createContentLoader } from 'vitepress'

import VPMedia from './.vitepress/media'

export default createContentLoader('./**/*/*.md', {
  transform: VPMedia({
    root: new URL('./', import.meta.url),
    mediaTypes: {
      cover: { size: 1200, height: 1000, fit: "inside" },
      icon: { size: 400, height: 400, fit: "inside" },
    }
  })
})