<script setup>
import { useData, useRoute } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { pages, routes, trailing, getMediaPath } from '../../composables/pages.js'


const page = computed(() => routes.find(p => {
  return trailing(p.path) == route.path
})
)
</script>

<template lang='pug'>
header
  .flex.flex-col.items-center
    a.no-underline.p-4.flex-auto.flex.items-center.justify-center(href="/")
      img.w-14rem(:src="theme.logo")
    .flex.flex-col.w-full.justify-center.max-w-3xl
      .flex.flex-wrap.w-full.flex-1
        a.link.no-underline.transition-all.duration-300.text-xl.justify-center(
          v-for="page in pages['/']"
          :key= "page.path"
          :href="page.path + '/'"
          :class="{ active: route.path.includes(page.path) }"
          )
          h4.text-lg {{ page.title }} 
      page-parents
      
</template>
<style lang="postcss" scoped>
header {
  flex: 1 1 100%;
  background-color: #f9a02c;
  @apply flex flex-col z-2 shadow-lg;
  & .link {
    @apply p-4 bg-light-400 bg-opacity-10 dark_bg-dark-700 dark_bg-opacity-10;
    &.active {
      @apply bg-light-100 bg-opacity-70 z-2 dark_bg-dark-200 dark_bg-opacity-70
    }
  }
}
.info {
  @apply flex flex-col items-center gap-2 w-full p-4 bg-light-600 dark_bg-dark-500;
}
</style>