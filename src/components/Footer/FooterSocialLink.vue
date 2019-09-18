<template>
  <a class="footer-social-link" :href="icon">
    <i :class="icon"></i>
  </a>
</template>

<script>
export default {
  name: 'footer-social-icon',
  props: {
    icon: {
      type: String
    },
    link: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-social-link {
  border-radius: 50%;
  background-color: $docColorLightGray;
  width: $footerIconRatio;
  height: $footerIconRatio;
  display: flex;
  justify-content: center;
  align-items: center;
  @extend .transition;
  &:hover {
    background-color: $typoColorFuchsia;
    color: $typeColorWhite;
  }
}
</style>
