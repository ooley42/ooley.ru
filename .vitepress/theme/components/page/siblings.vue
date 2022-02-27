<script setup>
import {  useRoute,  } from 'vitepress'

const route = useRoute()

import { getSiblings, trailing } from '../../composables/pages.js'

const siblings = computed(() => getSiblings(route.path))
</script>

<template lang='pug'>
.flex.flex-wrap.items-stretch.justify-stretch.w-full(v-if="siblings")
  a.link(
    v-if="siblings.prev" 
    :href="trailing(siblings.prev.path)"
    ) 
    la-angle-left.mr-2
    h4.text-lg {{ siblings.prev.title }}
  a.link.justify-end(
    v-if="siblings.next" 
    :href="trailing(siblings.next.path)"
    ) 
    h4.text-lg {{ siblings.next.title }}
    la-angle-right.ml-2
</template>

<style lang="postcss" scoped>

</style>