<script setup>
import { useData, useRoute } from 'vitepress'
import { data } from '../../../../pages.data.js'
import { cleanLink, useParents } from '../../composables/pages.js'

const route = useRoute();
const parents = useParents(route, data)

function getImage(page) {
  if (page?.cover) {
    return `url(${page?.cover})`
  } else if (page?.icon) {
    return `url(${page?.icon})`
  } else {
    return 'transparent'
  }
}
</script>

<template lang='pug'>  
.flex.flex-wrap.items-stretch.w-full(v-if="parents")
  //- a.link.p-4.w-full(
  //-   v-if="route.path != '/'"
  //-   style="flex: 1 1 auto"
  //-   href="/"
  //-   ) 
  //-   h4.text-lg Начало
  //-   .flex-1
  //-   la-angle-up
  a.link.p-4.active.relative.text-center.flex-auto.shadow-lg(
    style="flex: 1 1 auto" 
    v-for="(page, p) in parents" 
    :key="page.url" 
    :href="page.url"
    :style="{ backgroundImage: getImage(page?.frontmatter) }"
    ) 
    .panel.flex
      h4.text-lg.w-full.-mt-1 {{ page?.frontmatter?.title }}
      .i-octicon-chevron-up.right-4.text-2xl
</template>


<style lang="postcss" scoped>
.link .panel {
  @apply z-10 p-4 m-2 shadow-md bg-light-200 bg-opacity-90 dark-bg-dark-200 dark-bg-opacity-90 rounded flex items-center;
}

.link::before {
  z-index: 1;
  transition: all 200ms ease-in-out;
  /* backdrop-filter: blur(6px); */
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: hsla(0, 0%, 100%, 0.6);
}

.dark .link::before {
  background-color: hsla(0, 0%, 0%, 0.6);
}

.link:hover::before {
  backdrop-filter: blur(0px);
  background-color: hsla(0, 0%, 0%, 0);
}
</style>