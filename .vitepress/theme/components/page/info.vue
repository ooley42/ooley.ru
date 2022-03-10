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
.bg-light-700.dark_bg-dark-400.p-6.border-dark-200.dark_border-light-400.rounded-lg.flex.flex-col.gap-2.items-center(
  v-if="page?.city || page?.place || page?.address || page?.tel || page?.status || page?.hours || frontmatter?.url"
)
  .font-bold.text-2xl(v-if="page?.city") {{page.city}}
  .font-bold.flex.items-center(v-if="page?.place") 
    .text-md {{page?.place}}
  .text-md(v-if="page?.address") {{page.address}}

  
  social-icons.text-3xl.pt-4.pb-2(:links="page")
  a.underline.text-2xl.mb-4(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
  item-status(:status="page?.status")
  .text-sm.my-1.text-center.flex.items-center(v-if="page?.hours") {{page.hours}}



      
</template>
<style lang="postcss" scoped>
</style>