<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()
</script>

<template lang="pug">
transition(name="fade" mode="out-in")
  page-main(:key="route.path")
</template>

<style lang="postcss" scoped>
</style>