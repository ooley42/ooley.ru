<script setup>
import { useData, useRoute } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { routes, pages, trailing, getMediaPath } from '../../composables/pages.js'

const page = computed(() => routes.find(p => {
  return trailing(p.path) == route.path
})
)

//  const filePath = route?.path.split("/").filter(Boolean).join("-");
//  let p = `/media_files/${media}/${filePath}-${route?.data?.[media]}`;

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
        img.w-full.max-w-100vw(v-if="page?.cover" :src="page?.cover")
        youtube-embed(v-if="page?.youtube" :link="page?.youtube")
        vimeo-embed(v-if="page?.vimeo" :link="page.vimeo")
        content.content.bg-light-200.dark_bg-dark-300
        .flex-auto(
          style="flex: 1000 1"
        ) 
      .flex.flex-wrap.gap-8.p-8.w-full(style="flex: 1 1 100%" v-if="pages[route.path] && Object.keys(pages[route.path]).length > 0")
        item-card(
          v-for="page in pages[route.path]"
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
  @apply bg-cover bg-center  flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
}
</style>