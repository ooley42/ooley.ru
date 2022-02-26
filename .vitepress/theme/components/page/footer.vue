<script setup>
import { useData, withBase } from 'vitepress'
const { theme } = useData();
</script>

<template lang='pug'>
footer.flex.flex-wrap.p-4.justify-center.transition-all.duration-600.bg-light-900.items-center.dark_bg-dark-600
  a.no-underline.p-4(:href="withBase('/')")
    img.w-12rem(:src="withBase(theme.logo)")
</template>