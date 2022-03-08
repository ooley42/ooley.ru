<script setup>
import { useData, useRoute } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { routes, pages, trailing, getMediaPath } from '../../composables/pages.js'

const page = computed(() => routes.find(p => {
  return trailing(p.path) == route.path
  })
)


</script>

<template lang="pug">
.min-h-100vh.flex.flex-col.leading-relaxed
  nav-dark.p-4.mr-4.fixed.bottom-22.right-0.z-90
  nav-scroll.fixed.bottom-8.right-4.p-4.rounded-full.cursor-pointer.z-90
    la-angle-up
  page-header.w-full.sticky.top-0
  main.flex.flex-col.items-center.flex-1
    .flex-auto.h-50vh.w-full.-z-30.flex.flex-col.items-center(v-if="page?.cover")
      img.w-full.opacity-50.fixed(:src="page?.cover")
    page-sidebar.max-w-3xl.w-full.shadow-lg
    .flex.flex-col.w-full.backdrop-filter.backdrop-blur-md.items-center.z-20.bg-light-500.bg-opacity-95.z-2.dark_bg-dark-500.dark_bg-opacity-95(style="flex: 1000 1 420px")
      map-ol.w-full(v-if="page?.map" :routes="routes" :route="route.path" :key="route.path")
      
      .flex.flex-col.items-stretch.max-w-3xl.w-full.shadow-lg

        youtube-embed(v-if="page?.youtube" :link="page?.youtube")
        vimeo-embed(v-if="page?.vimeo" :link="page.vimeo")
        
        
        .toc.flex.flex-col.w-full.p-4.text-left.gap-1(v-if="page?.toc")
          a.flex.items-center.font-bold(v-for="header in route.data.headers"
            :href="`#${header.slug}`"
            ) 
            p(v-for="level in header.level-1") ・
            .ml-1 {{header.title}}
        content.content.bg-light-200.dark_bg-dark-300(v-if="!page?.empty")
      .flex.flex-wrap.gap-8.p-8.w-full.max-w-3xl(style="flex: 1 1 100%" v-if="pages[route.path] && Object.keys(pages[route.path]).length > 0")
        item-card(
          v-for="page in pages[route.path]"
          :key= "page.path"
          :page="page"
          )
      .max-w-3xl.w-full
        page-siblings
        page-parents
  page-footer 
</template>

<style lang="postcss">
a.link {
  @apply bg-cover bg-center flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
  &.active {
    @apply bg-light-100 bg-opacity-70 z-2 dark_bg-dark-200 dark_bg-opacity-70
  }
}
</style>