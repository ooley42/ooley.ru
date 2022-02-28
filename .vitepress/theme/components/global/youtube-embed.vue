<script setup>
const props = defineProps({
  link: {
    type: String,
    default: ''
  }
});

let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

const id = computed(() => {
  if (props?.link.includes('youtu')) {
    let r = props.link.match(rx)
    return r[1]
  } else {
    return props.link
  }
})
</script>
  
<template lang="pug">
.iframe-container
  iframe.overflow-hidden.mx-auto(
    loading="lazy"
    :src="`https://www.youtube-nocookie.com/embed/${id}`", 
    title="YouTube video player", 
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