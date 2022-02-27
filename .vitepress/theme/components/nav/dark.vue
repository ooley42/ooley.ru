<script setup>
import { isDark, toggleDark } from '../../composables/state.js'

</script>

<template lang="pug">
button(@click="toggleDark()" aria-label="Toggle dark mode")
  carbon-moon(v-show="isDark")
  ion-ios-sunny(v-show="!isDark")
</template>
