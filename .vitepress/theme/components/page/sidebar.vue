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
.info
  img.max-w-62.rounded-lg.mb-4(v-if="page?.icon" :src="page.icon")
  h1.text-2xl.font-bold {{ frontmatter.title }}
  .text-lg(v-if="frontmatter.subtitle") {{ frontmatter.subtitle }}
  .font-bold.text-lg(v-if="page?.city") {{page.city}}
  .font-bold.flex.items-center(v-if="page?.place") 
    .text-sm {{page?.place}}
  .text-md(v-if="page?.address") {{page.address}}

  a.underline.text-lg(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
  a(v-if="page?.tel" :href="`tel://${page.tel}`") {{page.tel}}
  social-icons.text-3xl.py-4(:links="page")
  item-status(:status="page?.status")
  .text-sm.my-1(v-if="page?.hours") 
    .font-bold.mb-2 Режим работы
    p {{page.hours}}



      
</template>
<style lang="postcss" scoped>
.info {
  flex: 1 1 100%;
  @apply flex flex-col p-4 gap-2 z-2 items-center text-center rounded-t-sm backdrop-filter backdrop-blur-md bg-light-200 bg-opacity-90 dark_bg-dark-200 dark_bg-opacity-90;
  & .link {
    @apply p-4;
  }
}
</style>