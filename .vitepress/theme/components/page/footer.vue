<script setup>
import { useData } from 'vitepress'
const { theme } = useData();
</script>

<template lang='pug'>
footer.max-w-3xl.w-full.sticky.bottom-0.flex.flex-col.justify-center.transition-all.duration-600.backdrop-filter.backdrop-blur-2xl.bg-dark-50.bg-opacity-30.dark_bg-opacity-30.items-center.dark_bg-dark-600
  slot
  a.no-underline.mb-2(href="/")
    img.w-12rem(:src="theme.logo")
  social-icons.text-2xl.mt-6.mb-4(:links="theme.social")
</template>

<style lang="postcss" scoped>
/* footer {
  background-color: #f9a02c55;
} */
</style>