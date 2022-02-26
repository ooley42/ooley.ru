<script setup>
import { watch, ref, computed, onMounted } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { getMediaPath } from '../../composables/media.js'

const reverseParents = computed(() => [...parents.value].reverse())

const { site, frontmatter, theme } = useData();
const route = useRoute();

import { pages, getSiblings, getParents, trailing } from '../../composables/pages.js'

const siblings = computed(()=> getSiblings(route.path.substring(9)))

const parents = computed(()=> getParents(route.path.substring(9)))

</script>

<template lang="pug">
.min-h-100vh.flex.flex-col.leading-relaxed
  nav-dark.p-4.mr-4.fixed.top-4.right-0.z-90
  nav-scroll.fixed.bottom-8.right-4.p-4.rounded-full.cursor-pointer.z-90
    la-angle-up
  .flex.flex-wrap.flex-1.bg-cover.bg-fixed.z-10
    header.bg-light-200.bg-opacity-90.z-2.dark_bg-dark-200.dark_bg-opacity-90(
      style="flex: 1 1 320px"
      ) 
      .sticky.top-0.flex.flex-col.items-center.text-center
        a.no-underline.p-4(:href="withBase('/')")
          img.w-12rem(:src="theme.logo")
        a.link.p-4.w-full(
          v-if="route.path != '/'"
          style="flex: 1 1 auto;"
          :href="withBase('/')") 
            h4.text-lg {{ site.title }}
            .flex-1
            la-angle-up
        .flex.flex-wrap.items-stretch.w-full(v-if="parents")
          a.link.p-4(
            style="flex: 1 1 auto;"
            v-for="page in parents", :key="page.title" :href="withBase(trailing(page.path))") 
              h4.text-lg {{ page.title }}
              .flex-1
              la-angle-up
        h1.w-full.text-2xl.font-bold.mb-4.p-4.bg-light-600.dark_bg-dark-500.shadow-lg {{ frontmatter.title }}
        .p-4.flex.flex-wrap(v-if="route.path.substring(9) != '/'")
          .p-2(style="flex: 1 1 120px" v-if="frontmatter.icon")
            img.max-h-60vh.rounded-3xl(:src="getMediaPath(route.path, frontmatter.icon)")
          .p-4.flex-auto(v-if="frontmatter.subtitle")
            .text-md {{ frontmatter.subtitle }}
          .text-xs 
          a.p-2.flex-auto.underline.text-xl(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
          p {{ frontmatter.start_date }}


        .flex.flex-col.w-full(v-else) 
          a.link.p-4.no-underline.transition-all.duration-300.text-xl.justify-center.w-full(
            v-for="page in pages[route.path.substring(9)]"
            :key= "page.path"
            :href="withBase(page.path)+'/'"
            :class="{ active: route.path.includes(page.path) }"
           ) {{ page.title }} 

    .flex.flex-wrap.overflow-hidden.z-20.bg-light-500.bg-opacity-95.z-2.dark_bg-dark-500.dark_bg-opacity-95.max-w-3xl(style="flex: 1000 1 420px")

      .flex.flex-col(style="flex: 100 1 300px")
        img.w-full.max-w-100vw(v-if="frontmatter.cover" :src="getMediaPath(route.path, frontmatter.cover)") 
        content.content
        //- component.content(:is="route.component")
        .flex-auto(
          style="flex: 1000 1"
        )
      .flex.flex-wrap.gap-8.p-8.w-full(style="flex: 1 1 100%" v-if="pages && Object.keys(pages).length > 0")
        item-card(
          v-for="page in pages[route.path.substring(9)]"
          :key= "page.path"
          :page="page"
          )

    .flex-auto(style="flex:100")

    .flex.flex-wrap.items-stretch.justify-stretch.w-full(v-if="siblings")
      a.link.px-4.py-8(style="flex:1 1 auto" v-if="siblings.prev" :href="withBase(siblings.prev.path)+'/'") 
        la-angle-left.mr-2
        span {{ siblings.prev.title }}
      a.link.justify-end.px-4.py-8(style="flex:1 1 auto" v-if="siblings.next" :href="withBase(siblings.next.path)+'/'") 
        span {{ siblings.next.title }}
        la-angle-right.ml-2


  footer.flex.flex-wrap.p-4.justify-center.transition-all.duration-600.bg-light-900.items-center.dark_bg-dark-600
    a.no-underline.p-4(:href="withBase('/')")
      img.w-12rem(:src="theme.logo")

</template>

<style lang="postcss" scoped>
.link {
  @apply flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
}
</style>