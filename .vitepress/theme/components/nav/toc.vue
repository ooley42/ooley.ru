<script setup>
import { useData, useRoute } from 'vitepress'
import { onClickOutside } from '@vueuse/core'

const route = useRoute();
const target = ref()

const open = ref()

onClickOutside(target, (event) => open.value = false)

</script>

<template lang='pug'>
.fixed.top-0.left-0.z-200 
  button.screen-button.absolute.text-2xl.self-start.z-30.left-4.top-4.z-400(@mousedown="open = !open")
    ph-list-bullets
  transition(name="fade")
    .rounded-lg.leading-tight.shadow-lg.absolute.top-18.left-4.z-20.gap-2.flex.flex-col.py-6.px-4.text-left.gap-1.bg-light-500.dark_bg-dark-100.w-xs.max-h-90vh.overflow-y-scroll(
      v-if="open"
      ref="target"
      )
      a.flex.font-bold.pl-2(
        href="#start"
        @click="open = false"
      ) {{ route.data.title }}
      a.flex.items-center(
        @click="open = false"
        v-for="header in route.data.headers"
        :href="`#${header.slug}`"
        ) 
        .px-2(v-for="level in header.level - 1") 
        .ml-1 {{ header.title }}


</template>