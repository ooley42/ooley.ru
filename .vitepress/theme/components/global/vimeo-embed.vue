<script setup>
const props = defineProps({
  link: {
    type: String,
    default: ''
  }
});

let regEx = /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;


const id = computed(() => {
  if (props?.link.includes('vimeo')) {
    let match = props.link.match(regEx);
    if (match && match.length == 7) {
      return match[6];
    }
    else {
      return props.link
    }
  }
})
</script>
  
<template lang="pug">
.iframe-container
  iframe.overflow-hidden.mx-auto(
    loading="lazy"
    :src="`https://player.vimeo.com/video/${id}`", 
    title="Vimeo video player", 
    frameborder="0", 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", 
    allowfullscreen
    )
</template>

<style scoped>
.iframe-container {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>