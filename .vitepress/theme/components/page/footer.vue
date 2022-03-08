<script setup>
import { useData } from 'vitepress'
const { theme } = useData();
</script>

<template lang='pug'>
footer.flex.flex-col.p-4.justify-center.transition-all.duration-600.bg-light-900.items-center.dark_bg-dark-600
  a.no-underline.p-4(href="/")
    img.w-12rem(:src="theme.logo")
  social-icons.text-xl.py-4(:links="theme.social")
</template>