<script setup>
import { useData, useRoute, withBase } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { pages,  trailing, getMediaPath } from '../../composables/pages.js'


</script>

<template lang="pug">
.min-h-100vh.flex.flex-col.leading-relaxed
  nav-dark.p-4.mr-4.fixed.top-4.right-0.z-90
  nav-scroll.fixed.bottom-8.right-4.p-4.rounded-full.cursor-pointer.z-90
    la-angle-up
  .flex.flex-wrap.flex-1.bg-cover.bg-fixed.z-10
    page-header
    .flex.flex-wrap.overflow-hidden.z-20.bg-light-500.bg-opacity-95.z-2.dark_bg-dark-500.dark_bg-opacity-95.max-w-3xl(style="flex: 1000 1 420px")

      .flex.flex-col(style="flex: 100 1 300px")
        img.w-full.max-w-100vw(v-if="frontmatter.cover" :src="frontmatter.cover") 
        content.content
        .flex-auto(
          style="flex: 1000 1"
        )
      .flex.flex-wrap.gap-8.p-8.w-full(style="flex: 1 1 100%" v-if="pages && Object.keys(pages).length > 0")
        item-card(
          v-for="page in pages[route.path.substring(9)]"
          :key= "page.path"
          :page="page"
          )
    .flex-auto(style="flex:100")
    page-siblings
    page-parents
  page-footer
</template>

<style lang="postcss">
a.link {
  @apply p-4 md_p-8 flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
}
</style>