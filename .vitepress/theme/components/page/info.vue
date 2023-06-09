<script setup>
import { useData, useRoute } from 'vitepress'
const { frontmatter } = useData();

</script>

<template lang='pug'>
.bg-light-700.dark-bg-dark-400.p-6.border-dark-200.dark-border-light-400.rounded-lg.flex.flex-col.gap-2.items-center(
  v-if="frontmatter?.city || frontmatter?.place || frontmatter?.address || frontmatter?.tel || frontmatter?.status || frontmatter?.hours || frontmatter?.url"
)
  .font-bold.text-2xl(v-if="frontmatter?.city") {{ frontmatter.city }}
  .font-bold.flex.items-center(v-if="frontmatter?.place") 
    .text-md {{ frontmatter?.place }}
  .text-md(v-if="frontmatter?.address") {{ frontmatter.address }}


  social-icons.text-3xl.pt-4.pb-2(:links="frontmatter")
  a.underline.text-2xl.mb-4(v-if="frontmatter.url" :href="frontmatter.url" target="_blank") {{ frontmatter.url.replace(/^https?:\/\//, '') }}
  item-status(:status="frontmatter?.status")
  .text-sm.my-1.text-center.flex.items-center(v-if="frontmatter?.hours") {{ frontmatter.hours }}



      
</template>
<style lang="postcss" scoped></style>