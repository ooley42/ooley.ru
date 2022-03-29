<script setup>
import { useRoute } from 'vitepress'
import routes from '~pages'
import { getSiblings } from 'vitepress-pages/browser'

const route = useRoute();

const siblings = computed(() => getSiblings(route.path, routes))


function getImage(side) {
  if (siblings.value[side]?.cover) {
    return `url(${siblings.value[side].cover})`
  } else if (siblings.value[side]?.icon) {
    return `url(${siblings.value[side].icon})`
  } else {
    return 'transparent'
  }
}

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.items-stretch.justify-stretch.w-full(v-if="siblings")
  a.link.px-4.pt-28.pb-4.shadow-lg(
    v-if="siblings.prev" 
    :href="siblings.prev.path"
    :style="{ backgroundImage: getImage('prev'), backgroundColor: siblings.prev?.color ? siblings.prev.color : 'transparent' }"
    ) 
    .panel
      octicon-chevron-left.mr-2.text-xl
      h4.text-lg.-mt-1 {{ siblings.prev.title }}
  a.link.justify-end.px-4.pt-28.pb-4.shadow-lg(
    v-if="siblings.next" 
    :href="siblings.next.path"
    :style="{ backgroundImage: getImage('next'), backgroundColor: siblings.next?.color ? siblings.next.color : 'transparent' }"
    ) 
    .panel
      h4.text-lg.-mt-1 {{ siblings.next.title }}
      octicon-chevron-right.ml-2.text-xl
</template>

<style lang="postcss" scoped>
.link .panel {
  @apply z-10 p-4 m-2 shadow-md bg-light-200 bg-opacity-90 dark_bg-dark-200 dark_bg-opacity-90 rounded flex items-center flex-wrap;
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