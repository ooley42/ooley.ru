<script setup>
const props = defineProps({
  links: { type: Object, default: {} }
})
</script>

<template lang='pug'>
.flex.flex-wrap.gap-3
  a(v-if="links?.tel" :href="`tel:${links.tel}`" title="Telephone") 
    .i-la-phone
  a(v-if="links?.email" :href="`mailto:${links.email}`" title="E-mail") 
    .i-ion-at
  a(v-if="links?.vk" :href="`https://vk.com/${links.vk}`" target="_blank" title="VK")
    .i-ion-logo-vk
  a(v-if="links?.instagram" :href="`https://instagram.com/${links.instagram}`" target="_blank" title="Instagram")
    .i-ion-logo-instagram
  a(v-if="links?.telegram" :href="`https://t.me/${links.telegram}`" target="_blank" title="Telegram")
    .i-mdi-telegram
  a(v-if="links?.facebook" :href="`https://facebook.com/${links.facebook}`" target="_blank" title="Facebook")
    .i-ion-logo-facebook
  a(v-if="links?.github" :href="`https://github.com/${links.github}`" target="_blank" title="GitHub")
    .i-ion-logo-github
  a(v-if="links?.['youtube-channel']" :href="`https://youtube.com/channel/${links['youtube-channel']}`" target="_blank" title="Youtube")
    .i-ion-logo-youtube
</template>