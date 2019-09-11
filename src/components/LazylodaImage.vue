<template>
  <div class="lazyImage" :class="{'is-loaded': loaded}">
    <div class="lazyImage-bg"></div>
    <img class="lazyImage-img" ref="image" :src="srcset" />
  </div>
</template>
<script>
export default {
  name: 'image-loader',
  props: {
    src: {
      type: String
    }
  },
  data() {
    return {
      srcset: null,
      loaded: false
    }
  },
  mounted() {
    this.srcset = this.src
    this.$refs.image.onload = () => {
      this.loaded = true
    }
  }
}
</script>

<style lang="scss">
.lazyImage {
  position: relative;
  animation: shimmer 1.2s ease-in-out infinite;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lazyImage-bg {
  background: #ddd;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 500ms;
  transform-origin: left;
}
.lazyImage-img {
  opacity: 0;
}
.lazyImage.is-loaded {
  animation: none;
}
.lazyImage.is-loaded .lazyImage-img {
  opacity: 1;
}
.lazyImage.is-loaded .lazyImage-bg {
  transform: scaleX(0);
}
@-moz-keyframes shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.8;
  }
}
@-webkit-keyframes shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.8;
  }
}
@-o-keyframes shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.8;
  }
}
@keyframes shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.8;
  }
}

</style>
