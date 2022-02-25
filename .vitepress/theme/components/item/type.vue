<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: String
})

const types = {
  design: 'Программа',
  project: 'Проект',
  event: 'Событие',
}

const ruType = computed(() => types[props.type])
</script>

<template lang='pug'>
.text-sm.mb-2(v-if="ruType") {{ ruType }}
</template>