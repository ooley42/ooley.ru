<script setup>
import { useData, useRoute } from 'vitepress'
import { data } from '../../../../pages.data.js'
import { cleanLink, useSiblings } from '../../composables/pages.js'

const route = useRoute();
const siblings = useSiblings(route, data)


function getImage(side) {
  if (siblings.value[side]?.frontmatter?.cover) {
    return `url(${siblings.value[side]?.frontmatter.cover})`
  } else if (siblings.value[side]?.frontmatter?.icon) {
    return `url(${siblings.value[side]?.frontmatter.icon})`
  } else {
    return 'transparent'
  }
}

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.items-stretch.justify-stretch.w-full(v-if="siblings")
  a.link.px-4.pt-28.pb-4.shadow-lg(
    v-if="siblings.prev" 
    :href="siblings.prev.url"
    :style="{ backgroundImage: getImage('prev'), backgroundColor: siblings.prev?.frontmatter?.color ? siblings.prev?.frontmatter.color : 'transparent' }"
    ) 
    .panel
      .i-octicon-chevron-left.mr-2.text-xl
      h4.text-lg.-mt-1 {{ siblings.prev?.frontmatter?.title }}
  a.link.justify-end.px-4.pt-28.pb-4.shadow-lg(
    v-if="siblings.next" 
    :href="siblings.next.url"
    :style="{ backgroundImage: getImage('next'), backgroundColor: siblings.next?.frontmatter?.color ? siblings.next?.frontmatter.color : 'transparent' }"
    ) 
    .panel
      h4.text-lg.-mt-1 {{ siblings.next?.frontmatter.title }}
      .i-octicon-chevron-right.ml-2.text-xl
</template>

<style lang="postcss" scoped>
.link .panel {
  @apply z-10 p-4 m-2 shadow-md bg-light-200 bg-opacity-90 dark-bg-dark-200 dark-bg-opacity-90 rounded flex items-center flex-wrap;
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