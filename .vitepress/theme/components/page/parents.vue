<script setup>
import { useData, useRoute } from 'vitepress'

const { site } = useData();
const route = useRoute();

import { getParents, trailing } from '../../composables/pages.js'

const parents = computed(() => getParents(route.path))
</script>

<template lang='pug'>  
.flex.flex-wrap.items-stretch.w-full(v-if="parents")
  a.link.p-4.w-full(
    v-if="route.path != '/'"
    style="flex: 1 1 auto"
    href="/"
    ) 
    h4.text-lg Начало
    .flex-1
    la-angle-up
  a.link.p-4(style="flex: 1 1 auto" v-for="page in parents" :key="page.title" :href="trailing(page.path)") 
    h4.text-lg {{ page.title }}
    .flex-1
    la-angle-up
</template>


<style lang="postcss" scoped>
.link {
  @apply flex-auto relative flex items-center text-sm text-center transition-all duration-500 no-underline bg-light-500/60 dark_(bg-dark-100/10) hover_(bg-light-100 dark_bg-dark-100);
}
</style>