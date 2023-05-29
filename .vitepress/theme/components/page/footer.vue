<script setup>
import { useData } from 'vitepress'
const { theme } = useData();
</script>

<template lang='pug'>
footer.shadow-xl.pt-8.w-full.flex.flex-col.justify-center.transition-all.duration-600.backdrop-filter.backdrop-blur-2xl.bg-light-900.bg-opacity-80.dark-bg-opacity-80.items-center.dark-bg-dark-600
  slot
  a.no-underline.mb-2(href="/" title="Go back to the main page")
    img.w-12rem(:src="theme.logo" alt="Bottom OOLEY logo")
  social-icons.text-2xl.mt-6.mb-6(:links="theme.social")
</template>

<style lang="postcss" scoped>
/* footer {
  background-color: #f9a02c55;
} */
</style>