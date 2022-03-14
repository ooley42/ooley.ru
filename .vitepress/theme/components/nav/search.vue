<script setup>
import { fuse, trailing } from '../../composables/pages'
import { useFocus, onClickOutside } from '@vueuse/core'

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
.fixed.top-6.right-6.z-200
  button.absolute.right-0.top-0.z-400(@mousedown="toggle()")
    la-search.text-2xl
  button.absolute.right-8.top-1.z-400(v-if="open && input" @click="input = ''")
    la-times.text-lg
  transition(name="fade")
    .absolute.-right-4.-top-4.z-200(v-if="open")
      input.p-4.rounded-lg.z-20.w-xs.bg-light-100.dark_bg-dark-100(v-model="input" ref="target")
      .flex.flex-col.max-h-80vh.overflow-y-scroll.shadow-lg.mt-2.rounded-lg
        a.px-3.py-3.bg-light-400.dark_bg-dark-400.hover_bg-light-100.dark_hover_bg-dark-600(
          :href="trailing(candidate.item.path)"
          @click="input = ''"
          v-for="candidate in candidates" :key="candidate"
          :style="{ opacity: 1 - candidate.score / 2 }"
        ) 
          .font-bold {{ candidate.item.title }}
          .text-sm {{ candidate.item.subtitle }} 
</template> 