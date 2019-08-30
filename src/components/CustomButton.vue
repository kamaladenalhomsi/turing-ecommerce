<template>
  <b-button :class="['m-is-' + type, 'btn-size-' + size]" :loading="loading">
    <i v-if="icon" :class="[icon, 'pr-2']"></i>
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    size: {
      type: String
    },
    icon: {
      type: String
    },
    loading: {
      type: Boolean
    }
  }
}
</script>
