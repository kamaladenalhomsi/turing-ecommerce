<template>
  <div>
    <div class="title">
      {{ title }}
    </div>
    <div class="dropdown">
      Item
    </div>
  </div>
</template>

<script>
export default {
  name: 'full-width-dropdown',
  props: {
    title: {
      type: String
    }
  }
}
</script>
