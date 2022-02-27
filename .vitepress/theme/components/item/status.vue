<script setup>
import { isDark } from '../../composables/state.js'

const props = defineProps({
  status: { type: String },
  statuses: {
    type: Object, default: {
      closed: {
        text: 'Закрыто',
        light: 'hsla(0,80%,80%,1)',
        dark: 'hsla(0,80%,30%,1)'
      },
      open: {
        text: 'Открыто',
        light: 'hsla(100,80%,80%,1)',
        dark: 'hsla(100,80%,30%,1)'
      }
    }
  }
})


const state = computed(() => props.statuses[props.status])

</script>

<template lang='pug'>
.px-3.rounded-full.bg-light-900.flex.items-center.max-w-min(
  v-if="state"
  :style="{ backgroundColor: isDark ? state.dark : state.light }"
  ) {{ state.text }}
</template>