<template>
  <div class="top-level-header">
    <div class="container">
      <div class="w-full flex">
        <div class="w-1/3 flex">
          HI
          <auth-temp title="Sign up" openBtnText="Dialog">
            <b-field>
              <b-input placeholder="Email"></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Password"></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Re-type password"></b-input>
            </b-field>
            <custom-button
              class="auth-modal__submit mt-8 mx-auto"
              size="large"
              type="filled-fuchsia"
            >Sign Up</custom-button>
            <div class="mt-4 flex justify-center f-opensans">
              Already a member?
              <a class="ml-3 c-fushia">Sign In</a>
            </div>
          </auth-temp>
        </div>
        <div class="w-1/3 flex"></div>
        <div class="w-1/3 flex"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-level-header {
  height: 40px;
  width: 100%;
  background-color: $docColorWhite;
}
</style>

<script>

import AuthTemp from '@/components/Authentication/AuthTemp.vue'
export default {
  components: {
    AuthTemp
  }
}
</script>
