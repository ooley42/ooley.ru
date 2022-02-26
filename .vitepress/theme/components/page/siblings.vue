<script setup>
import {  useRoute, withBase } from 'vitepress'

const route = useRoute()

import { getSiblings, trailing } from '../../composables/pages.js'

const siblings = computed(() => getSiblings(route.path.substring(9)))
</script>

<template lang='pug'>
.flex.flex-wrap.items-stretch.justify-stretch.w-full(v-if="siblings")
  a.link(
    v-if="siblings.prev" 
    :href="trailing(withBase(siblings.prev.path))"
    ) 
    la-angle-left.mr-2
    h4.text-lg {{ siblings.prev.title }}
  a.link.justify-end(
    v-if="siblings.next" 
    :href="trailing(withBase(siblings.next.path))"
    ) 
    h4.text-lg {{ siblings.next.title }}
    la-angle-right.ml-2
</template>

<style lang="postcss" scoped>
.link {
  flex:1 1 auto;
  @apply flex-auto px-4 py-8 relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);

}
</style>