<template>
  <b-button :class="['m-is-' + type, 'btn-size-' + size]" :loading="loading">
    <i v-if="icon" :class="[icon, 'pr-2']"></i>
    <slot></slot>
  </b-button>
</template>

<style lang="scss" scoped>

.custom-filled-button {
  background-color: $docColorFuchsia;
  border: 0;
  border-radius: 50px;
  color: $typeColorWhite;
  font-family: $montserrat;
  height: 45px;
  padding: 0px 18px;
  span {
    font-size: 14px !important;
  }
}

.m-is-outlined,
.m-is-outlined-fuchsia,
.m-is-filled-white,
.m-is-filled-fuchsia {
  border-radius: 20px;
  padding: 0 25px;
  font-weight: bold;
  @extend .transition;
}

.m-is-pure {
  background-color: transparent !important;
  border: 0px !important;
  width: 100px;
  color: $typoColorFuchsia !important;
}

.m-is-filled-white {
  color: $typoColorFuchsia;
  border: 2px solid $typeColorWhite;
  &:hover {
    background-color: $typoColorFuchsia;
    color: $typeColorWhite;
  }
}

.m-is-filled-fuchsia {
  color: $typeColorWhite;
  border: 2px solid $typoColorFuchsia;
  background-color: $typoColorFuchsia;
  &:hover {
    background-color: transparent;
    span {
      color: $typoColorFuchsia;
    }
  }
}

.m-is-large {
  border-radius: 50px;
  span {
    font-size: 20px;
  }
}

.m-is-outlined,
.m-is-outlined-fuchsia {
  background-color: transparent;
  @extend .transition;
}

.m-is-outlined {
  color: $typeColorWhite;
  border: 2px solid $typeColorWhite;
  &:hover {
    background-color: $typeColorWhite !important;
    color: $typoColorFuchsia;
    border-color: $typeColorWhite;
  }
}

.m-is-outlined-fuchsia {
  color: $typoColorFuchsia;
  border: 2px solid $typoColorFuchsia;
  &:hover {
    background-color: $typoColorFuchsia !important;
    color: $typeColorWhite;
    border-color: $typoColorFuchsia;
  }
}
</style>

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
