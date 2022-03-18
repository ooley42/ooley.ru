<script setup>
import { useData, useRoute } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { routes, pages, trailing, getMediaPath } from '../../composables/pages.js'

const page = computed(() => routes.find(p => trailing(p.path) == route.path))

const backgroundImage = computed(() => {
  if (frontmatter.value.home) {
    return `url(${frontmatter.value.cover})`
  }
  return page.value?.cover ? `url(${page.value.cover})` : 'none'
})

</script>

<template lang="pug">
.min-h-100vh.flex.flex-col.items-center.leading-relaxed
  nav-search
  nav-toc(v-if="page?.toc")
  nav-dark.screen-button.fixed.bottom-4.left-4.z-90
  nav-scroll.screen-button.fixed.bottom-4.right-4.z-90
  page-header.w-full
  transition(name="fade" mode="out-in")
    main.flex.flex-col.items-center.flex-1.w-full(:key="route.path")
      .cover(
        :style="{ backgroundImage, backgroundColor: page?.color ? page.color : 'transparent' }"
      )
        //- img.w-full.fixed.top-0(:src="page?.cover" v-if="page?.cover" alt="Page cover")
        img.max-w-62.rounded-lg.absolute.mt-8(v-if="page?.icon" :src="page.icon" alt="Page icon")
        page-heading.max-w-3xl.w-full.shadow-lg(:style="{ marginTop: page?.cover || frontmatter.home || page?.icon ? '40vh' : '0' }")
      .shadow-xl.relative.flex.flex-col.gap-6.w-full.backdrop-filter.backdrop-blur-lg.items-center.bg-light-500.bg-opacity-99.z-2.dark_bg-dark-500.dark_bg-opacity-99(style="flex: 1000 1 420px")
        map-ol.w-full(v-if="page?.map" :routes="routes" :route="route.path" :key="route.path")

        .flex.flex-col.items-stretch.max-w-3xl.w-full.shadow-lg
          page-info
          //- map-ol.w-full(v-if="page?.coord" :showCenter="true" :page="page" :center="page?.coord" :route="route.path" :key="route.path")
          youtube-embed(v-if="page?.youtube" :link="page?.youtube")
          vimeo-embed(v-if="page?.vimeo" :link="page.vimeo")

          content.content.bg-light-200.dark_bg-dark-300(v-if="!page?.empty")
        .flex.flex-wrap.gap-8.my-10.w-full.max-w-3xl(style="flex: 1 1 100%" v-if="pages[route.path] && Object.keys(pages[route.path]).length > 0")
          item-card(
            v-for="page in pages[route.path]"
            :key= "page.path"
            :page="page"
            )
        .max-w-3xl.w-full.flex.flex-col.gap-4.mb-6
          nav-siblings
          nav-parents.gap-4.flex-col-reverse
          nav-bar.w-full
      page-footer
    
</template>

<style lang="postcss">
.cover {
  @apply flex-auto w-full -z-30 flex flex-col items-center bg-center bg-fixed bg-no-repeat;
  background-size: auto 100vh;
}

@supports (-webkit-touch-callout: none) {
  .cover {
    background-size: auto 100vh;
  }
}

.screen-button {
  @apply p-4 rounded-full transition ease-in-out cursor-pointer;
  &:hover {
    @apply bg-light-100 shadow-lg dark_bg-dark-800;
  }
}

a.link {
  @apply bg-cover bg-center flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
  &.active {
    @apply bg-light-100 bg-opacity-70 z-2 dark_bg-dark-200 dark_bg-opacity-70;
    &:hover {
      @apply bg-opacity-100 dark_bg-opacity-100;
    }
  }
}
</style>