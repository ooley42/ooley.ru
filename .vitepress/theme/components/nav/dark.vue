<script setup>
import { isDark, toggleDark } from '../../composables/state.js'

</script>

<template lang="pug">
button(@click="toggleDark()" aria-label="Toggle dark mode")
  .i-carbon-moon(v-show="isDark")
  .i-ion-ios-sunny(v-show="!isDark")
</template>
