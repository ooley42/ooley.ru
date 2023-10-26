<script setup>
import { useData, useRoute } from 'vitepress'
import { data } from '../../../../pages.data.js'
import { cleanLink, usePages } from '../../composables/pages.js'

const route = useRoute();
const { children } = usePages({ path: '/' }, data)


</script>

<template lang='pug'>
.m-0
  .flex.flex-wrap.w-full.flex-1
    a.link.no-underline.transition-all.duration-300.text-xl.justify-center(
      v-for="page in children"
      :key= "page.url"
      :href="page.url"
      :class="{ active: route.path.includes(cleanLink(page.url)) }"
      )
      h4.text-lg {{ page?.frontmatter?.title }} 
</template>

<style lang="postcss" scoped>
.link {
  @apply p-4 bg-light-400 bg-opacity-10 dark-bg-dark-700 dark-bg-opacity-10;
}

.link.active {
  @apply bg-light-100 bg-opacity-70 z-2 dark-bg-dark-200 dark-bg-opacity-70;
}
</style>