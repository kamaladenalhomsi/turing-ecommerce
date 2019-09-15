<template>
  <div @click="openConfirm">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String
    },
    message: {
      type: String,
      default: () => 'Continue on this task?'
    },
    cancelText: {
      type: String,
      default: () => 'Disagree'
    },
    confirmText: {
      type: String,
      default: () => 'Agree'
    },
    type: {
      type: String,
      default: () => 'is-primary'
    }
  },
  methods: {
    openConfirm() {
      const { title, message, cancelText, confirmText, type } = this
      this.$buefy.dialog.confirm({
        title,
        message,
        cancelText,
        confirmText,
        type,
        onConfirm: () => this.$emit('accept')
      })
    }
  }
}
</script>
