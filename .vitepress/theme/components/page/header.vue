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
  .sticky.top-0.flex.flex-col.items-center.text-center
    a.no-underline.p-4(href="/")
      img.w-12rem(:src="theme.logo")
    page-parents
    .info
      img.max-w-42.rounded-lg.mb-4(v-if="page?.icon" :src="page.icon")
      h1.text-2xl.font-bold {{ frontmatter.title }}
      .text-lg(v-if="frontmatter.subtitle") {{ frontmatter.subtitle }}
      .font-bold.text-lg(v-if="page?.city") {{page.city}}
      .font-bold.flex.items-center(v-if="page?.place") 
        .text-sm {{page?.place}}
      .text-md(v-if="page?.address") {{page.address}}

      a.underline.text-lg(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
      a(v-if="page?.tel" :href="`tel://${page.tel}`") {{page.tel}}
      .flex.flex-wrap.text-2xl.gap-3
        a(v-if="page?.email" :href="`mailto:${page.email}`") 
          ion-at
        a(v-if="page?.facebook" :href="`https://facebook.com/${page.facebook}`" target="_blank")
          ion-logo-facebook
        a(v-if="page?.vk" :href="`https://vk.com/${page.vk}`" target="_blank")
          ion-logo-vk
        a(v-if="page?.instagram" :href="`https://instagram.com/${page.instagram}`" target="_blank")
          ion-logo-instagram
        a(v-if="page?.telegram" :href="`https://t.me/${page.instagram}`" target="_blank")
          mdi-telegram
      item-status(:status="page?.status")
      .text-sm.my-1(v-if="page?.hours") 
        .font-bold.mb-2 Режим работы
        p {{page.hours}}


    .toc.flex.flex-col.w-full.p-4.text-left.gap-1(v-if="page?.toc")
      a.flex.items-center.font-bold(v-for="header in route.data.headers"
        :href="`#${header.slug}`"
        ) 
        p(v-for="level in header.level-1") ・
        .ml-1 {{header.title}}
      
      

    .flex.flex-wrap.w-full(v-if="route.path == '/'") 
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
.info {
  @apply flex flex-col items-center gap-2 w-full p-4 bg-light-600 dark_bg-dark-500;
}
</style>