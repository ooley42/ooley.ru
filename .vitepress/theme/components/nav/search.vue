<script setup>
import { useFocus, onClickOutside } from '@vueuse/core'
import Fuse from "fuse.js";
import { data } from '../../../../pages.data.js'


const fuse = new Fuse(data, {
  includeScore: true,
  ignoreLocation: true,
  keys: ["frontmatter.title", 'frontmatter.description', 'frontmatter.city', 'frontmatter.place'],
});

const open = ref()
const input = ref('')
const candidates = computed(() => fuse.search(input.value))

const target = ref()
const { focused } = useFocus(target)

function toggle() {
  open.value = !open.value
  if (open.value) {
    nextTick(() => {
      focused.value = true
    })

  }
}

onClickOutside(target, (event) => open.value = false)

</script>

<template lang='pug'>
.fixed.top-0.right-0.z-200
  button.screen-button.absolute.right-4.top-4.z-400(@click="toggle()" aria-label="Search")
    la-search.text-2xl
  button.absolute.right-16.top-9.z-400(v-if="open && input" @click="input = ''")
    la-times.text-lg
  transition(name="fade")
    .absolute.right-4.top-4.z-200(v-if="open")
      input.p-4.rounded-lg.z-20.w-xs.bg-light-100.dark-bg-dark-100(autofocus v-model="input" ref="target")
      .flex.flex-col.max-h-80vh.overflow-y-scroll.shadow-lg.mt-2.rounded-lg
        a.px-3.py-3.bg-light-400.dark-bg-dark-400.hover-bg-light-100.dark-hover-bg-dark-600.border-1.border-light-100.border-opacity-20(
          :href="candidate.item.url"
          @click="input = ''"
          v-for="candidate in candidates" :key="candidate"
          :style="{ opacity: 1 - candidate.score / 2 }"
        ) 
          .font-bold {{ candidate.item?.frontmatter?.title }}
          .text-sm {{ candidate.item?.frontmatter?.description }} 
          .text-sm.inline-flex(v-if="candidate.item?.frontmatter?.city || candidate.item?.frontmatter?.place")
            .font-bold.whitespace-nowrap {{ candidate.item?.frontmatter?.city }} 
            .ml-2 {{ candidate.item?.frontmatter?.place }}
</template> 