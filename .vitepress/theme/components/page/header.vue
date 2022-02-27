<script setup>
import { useData, useRoute } from 'vitepress'

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { pages,  trailing, getMediaPath } from '../../composables/pages.js'
</script>

<template lang='pug'>
header
  .sticky.top-0.flex.flex-col.items-center.text-center
    a.no-underline.p-4(href="/")
      img.w-12rem(:src="theme.logo")
    page-parents
    h1 {{ frontmatter.title }}
    .p-4.flex.flex-wrap(v-if="route.path != '/'")
      .p-2(style="flex: 1 1 120px" v-if="frontmatter.icon")
        //- img.max-h-60vh.rounded-3xl(:src="getMediaPath(route.path, frontmatter.icon)")
      .p-4.flex-auto(v-if="frontmatter.subtitle")
        .text-md {{ frontmatter.subtitle }}
      .text-xs 
      a.p-2.flex-auto.underline.text-xl(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
      p {{ frontmatter.start_date }}

    .flex.flex-wrap.w-full(v-else) 
      a.link.no-underline.transition-all.duration-300.text-xl.justify-center.w-full(
        v-for="page in pages[route.path]"
        :key= "page.path"
        :href="page.path+'/'"
        :class="{ active: route.path.includes(page.path) }"
        ) 
        h4.text-lg {{ page.title }} 
</template>
<style lang="postcss" scoped>
header {
  flex: 1 1 320px;
  @apply bg-light-200 bg-opacity-90 z-2 dark_bg-dark-200 dark_bg-opacity-90;
  & .link {
    @apply p-4;
  }
}
h1 {
  @apply w-full text-2xl font-bold mb-4 p-4 bg-light-600 dark_bg-dark-500 shadow-lg;
}
</style>