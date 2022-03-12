<script setup>
import { useData, useRoute } from 'vitepress'

const route = useRoute();

const open = ref()
</script>

<template lang='pug'>
.sticky.top-0.left-6.self-end.z-300.flex.relative.h-0
  transition(name="fade")
    .rounded-sm.shadow-lg.absolute.top-4.right-4.z-20.pr-16.flex.flex-col.p-4.text-left.gap-1.bg-light-500.w-xs.max-h-90vh.overflow-y-scroll(v-if="open")
      a.flex.items-center.font-bold(
        @click="open=false"
        v-for="header in route.data.headers"
        :href="`#${header.slug}`"
        ) 
        p(v-for="level in header.level - 1") ・
        .ml-1 {{ header.title }}
  button.button.text-3xl.self-start.z-30.absolute.right-6.top-4.mt-2(@click="open=!open")
    ic-baseline-toc

</template>