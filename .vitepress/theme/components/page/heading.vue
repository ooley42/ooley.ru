<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData();

</script>

<template lang='pug'>
.info
  h1.text-4xl.mt-4.mb-6.font-bold {{ frontmatter.title }}
  .text-xl(v-if="frontmatter.subtitle") {{ frontmatter.subtitle }}
       
</template>
<style lang="postcss" scoped>
.info {
  flex: 1 1 100%;
  @apply shadow-2xl flex p-8 md_p-16 flex-col gap-2 z-2 items-center text-center rounded-t-sm backdrop-filter backdrop-blur-md bg-light-200 bg-opacity-90 dark_bg-dark-200 dark_bg-opacity-90;
  & .link {
    @apply p-4;
  }
}
</style>