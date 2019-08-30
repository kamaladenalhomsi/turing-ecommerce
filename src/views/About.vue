<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
        <img src="/static/img/placeholder-1280x960.png" />
      </p>
    </b-modal>
    <button @click="isImageModalActive = true">Button</button>
  </div>
</template>

<script>
import AuthTemp from '@/components/Authentication/AuthTemp.vue'
export default {
  components: {
    AuthTemp
  },
  data() {
    return {
      isImageModalActive: false
    }
  }
}
</script>
