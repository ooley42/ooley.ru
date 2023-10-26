<script setup>
import { useData, useRoute } from 'vitepress'
import { data } from '../../../../pages.data.js'
import { cleanLink, usePages, usePage } from '../../composables/pages.js'

const route = useRoute();
const { pages, children } = usePages(route, data)
const { frontmatter } = useData();

const page = usePage(route, data)


const backgroundImage = computed(() => {
  if (frontmatter.value.home) {
    return frontmatter.value?.cover ? `url(${frontmatter.value.cover})` : 'none'
  }
  return page.value?.frontmatter?.cover ? `url(${page.value?.frontmatter.cover})` : 'none'
})

</script>

<template lang="pug">
.min-h-100vh.flex.flex-col.items-center.leading-relaxed
  nav-search
  nav-toc(v-if="page?.frontmatter?.toc")
  nav-dark.screen-button.fixed.bottom-4.left-4.z-90
  nav-scroll.screen-button.fixed.bottom-4.right-4.z-90
  page-header.w-full
  transition(name="fade" mode="out-in")
    main.flex.flex-col.items-center.flex-1.w-full(:key="route.path")
      .cover(
        :style="{ backgroundImage, backgroundColor: page?.frontmatter?.color ? page?.frontmatter?.color : 'transparent' }"
      )
        //- img.w-full.fixed.top-0(:src="page?.cover" v-if="page?.cover" alt="Page cover")
        img.min-w-50.max-w-62.rounded-lg.absolute.mt-12(v-if="page?.frontmatter?.icon" :src="page?.frontmatter?.icon" alt="Page icon")
        page-heading.max-w-3xl.w-full.shadow-lg(:style="{ marginTop: page?.frontmatter?.cover || frontmatter.home || page?.frontmatter?.icon ? '40vh' : '0' }")
      .shadow-xl.relative.flex.flex-col.gap-6.w-full.backdrop-filter.backdrop-blur-lg.items-center.bg-light-500.bg-opacity-99.z-2.dark-bg-dark-500.dark-bg-opacity-99(style="flex: 1000 1 420px")

        map-ol.w-full(v-if="page?.frontmatter?.map" :routes="data" :route="page?.frontmatter?.map" :key="route.url")

        .flex.flex-col.items-stretch.max-w-3xl.w-full.shadow-lg
          page-info
          youtube-embed(v-if="page?.frontmatter?.youtube" :link="page?.frontmatter?.youtube")
          vimeo-embed(v-if="page?.frontmatter?.vimeo" :link="page?.frontmatter?.vimeo")

          content.content.bg-light-200.dark-bg-dark-300(v-if="!page?.frontmatter?.empty")
        .flex.flex-wrap.gap-8.my-10.w-full.max-w-3xl(style="flex: 1 1 100%" v-if="children && children.length > 0")
          item-card(
            v-for="page in children"
            :key="page.url"
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
  @apply flex-auto w-full -z-30 flex flex-col items-center bg-center bg-cover bg-fixed bg-no-repeat;
}

@supports (-webkit-touch-callout: none) {
  .cover {
    @apply bg-scroll;
  }
}

.screen-button {
  @apply p-4 rounded-full transition ease-in-out cursor-pointer;
}

.screen-button:hover {
  @apply bg-light-100 shadow-lg dark-bg-dark-800;
}

a.link {
  @apply bg-cover bg-center flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark-(bg-dark-100/10) hover_(bg-light-100 dark-bg-dark-100);
}

a.link.active {
  @apply bg-light-100 bg-opacity-70 z-2 dark-bg-dark-200 dark-bg-opacity-70;
}

a.link.active:hover {
  @apply bg-opacity-100 dark-bg-opacity-100;
}
</style>