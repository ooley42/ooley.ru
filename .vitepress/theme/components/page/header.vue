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

      nav-bar
      nav-parents
      
      
</template>
<style lang="postcss" scoped>
header {
  flex: 1 1 100%;
  background-color: #f9a02c;
  @apply flex flex-col z-2 shadow-lg;
}
.info {
  @apply flex flex-col items-center gap-2 w-full p-4 bg-light-600 dark_bg-dark-500;
}
</style>