<template>
  <div>
    <b-modal :active.sync="isImageModalActive">
      <div class="auth-modal flex justify-center">
        <div class="auth-modal__wrapper">
          <div class="w-10/12 mx-auto">
            <i class="fa fa-times auth-modal__close" @click="isImageModalActive = false"></i>
            <h1 class="auth-modal__title text-center font-bold f-Montserrat">{{ title }}</h1>
            <div class="mt-8">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <custom-button
      @click.native="isImageModalActive = true"
      type="filled-fuchsia"
      :size="openBtnSize"
    >{{ openBtnText }}</custom-button>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-input-placeholder {
   text-align: center;
   font-weight: bold
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;
   font-weight: bold
}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
   font-weight: bold
}

:-ms-input-placeholder {
   text-align: center;
   font-weight: bold
}
.auth-modal {
  &__wrapper {
    background-color: #ffffff;
    width: 400px;
    min-height: 450px;
    box-shadow: 0px 20px 40px rgba(0,0,0, 0.3);
    padding: 30px 0px 40px 0px;
  }
  &__title {
    color: #2E2E2E;
    font-size: 24px
  }
  &__close {
    width: 100%;
    cursor: pointer;
    text-align: right;
    font-size: 30px;
  }
}

</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => 'Dialog'
    },
    openBtnText: {
      type: String,
      default: () => 'Open Dialog'
    },
    openBtnSize: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isImageModalActive: false
    }
  }
}
</script>
