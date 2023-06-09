<script setup>
import { useRoute, useData } from 'vitepress'
import { data } from '../../../../pages.data.js'
import { useChildren } from 'vitepress-pages'

const props = defineProps({
  page: Object
})

const children = useChildren(useRoute(), data)

function getDate(timestamp) {
  let date = new Date(timestamp)
  return date.toLocaleString('default', { month: 'short', year: '2-digit' });
}
</script>

<template lang="pug">
a.card.flex.flex-col.justify-between.items-center.bg-cover.bg-center.relative(
  style="flex: 1 1 280px;"
  :href="page.url"
  :style="{ backgroundColor: page?.frontmatter?.color ? page?.frontmatter?.color : 'transparent' }"
) 
  img.absolute.top-0.min-w-full.flex-1(
    :src="page?.frontmatter?.cover"
    v-if="page?.frontmatter?.cover"
    loading="lazy"
    alt="cover"
  )
  item-status.status.opacity-20.absolute.right-1.top-2.text-sm.transition.ease-out(:status="page?.frontmatter?.status")
  .flex-auto
  img.rounded-xl.w-36.z-22(
    style="margin:  1rem 0"
    v-if="page?.frontmatter?.icon"
    :src="page?.frontmatter?.icon"
    alt="Icon"
    loading="lazy"
    )
  ic-baseline-play-circle.play.transition.absolute.top-4.text-6em.z-20.opacity-40.text-white(v-if="page?.frontmatter?.vimeo || page?.frontmatter?.youtube")
  .flex-auto
  .relative.info.z-20.w-full.flex.flex-col.p-4.bg-light-400.bg-opacity-90.dark-bg-opacity-90.dark-bg-dark-200.transition-all.duration-300.backdrop-filter.backdrop-blur-sm(
    :style="{ marginTop: page?.frontmatter?.cover && !page?.frontmatter?.icon ? '240px' : '0' }"
  )

    //- .date.absolute.bottom-2.right-1.rounded-lg.bg-light-300.dark-bg-dark-400.pb-4px.px-2.opacity-30.transition.duration-200ms.ease-in.text-xs(v-if="page?.frontmatter?.date") {{ page?.frontmatter?.date.slice(0, 10) }}
    .flex.w-full.items-center
      .flex.flex-col
        item-type(:type="page?.frontmatter?.data?.type")
        h3.text-2xl.font-bold.md-text-2xl {{ page?.frontmatter?.title }} 
      .flex-1
      .ml-2.text-md.dark-bg-light-300.dark-bg-opacity-10.bg-dark-50.bg-opacity-10.rounded-md.px-6px(v-if="children > 0") {{ children }}
    .text-md.mt-1.line-clamp-4(v-if="page?.frontmatter?.description") {{ page?.frontmatter?.description }}
    .text-md.mt-2.font-bold(v-if="page?.frontmatter?.city") {{ page?.frontmatter?.city }}
    .text-md.text-sm(v-if="page?.frontmatter?.place") {{ page?.frontmatter?.place }}
</template>


<style lang="postcss" scoped>
.card {
  @apply overflow-hidden rounded-md shadow-md overflow-hidden bg-light-700 dark-(bg-dark-100) transition-all duration-200 no-underline hover-(bg-light-900 shadow-lg dark-(bg-dark-400));
}

.card:hover .info {
  @apply bg-light-100 dark-bg-dark-100;
}

.card:hover .play {
  @apply opacity-90 z-30;
}

.card::before {
  z-index: 1;
  transition: all 200ms ease-in-out;
  /* backdrop-filter: blur(3px); */
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: hsla(0, 0%, 100%, 0.5);
}

.dark .card::before {
  background-color: hsla(0, 0%, 0%, 0.5);
}

.card:hover::before {
  backdrop-filter: blur(0px);
  background-color: hsla(0, 0%, 0%, 0);
}

.card:hover .date,
.card:hover .status {
  @apply opacity-80;
}
</style>