<template>
  <div class="top-level-header py-8 lg:py-0" top-level-header-min-h>
    <div class="container flex flex-wrap top-level-header-min-h">
      <div
        class="w-full top-level-header-min-h justify-center lg:justify-start lg:w-1/3 flex flex items-center py-4 lg:py-0"
      >
        <h4 class="mr-4 f-Montserrat font-bold c-white">Hi!</h4>
        <auth-temp title="Sign up" openBtnText="SignUp">
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
        <h4 class="ml-4 mr-4 f-Montserrat font-bold c-white">or</h4>
        <auth-temp title="Login" openBtnText="Login">
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
      <ul
        class="w-full top-level-header-min-h justify-center lg:w-1/3 flex items-center py-4 lg:py-0"
      >
        <li
          class="top-level-header__item ml-8 font-bold text-sm f-montserrat"
          v-for="(item, index) in tlHeaderItems"
          :key="index"
        >
          <a>{{ item }}</a>
        </li>
      </ul>
      <div
        class="w-full top-level-header-min-h lg:w-1/3 flex items-center justify-center lg:justify-end py-4 lg:py-0"
      >
        <div class="gbr flex mr-8">
          <img :src="require('@/assets/images/gbr.png')" alt srcset />
          <h4 class="ml-4 f-Montserrat font-bold c-white">£GBR</h4>
        </div>
        <div class="top-level-header__bag">
          <span
            class="top-level-header__bag__badge inline-flex justify-center items-center text-xs font-bold"
          >2</span>
          <img :src="require('@/assets/images/icons-bag.png')" alt srcset />
        </div>
        <h4 class="ml-4 f-Montserrat font-bold c-white">Your Bag: $14.99</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.top-level-header-min-h {
  min-height: 50px;
}

.top-level-header {
  width: 100%;
  background-color: $docColorBlack;
  &__item a {
    color: $typeColorWhite;
    transition: 0.3s;
    &:hover {
      color: $typoColorFuchsia;
    }
  }
  &__bag {
    cursor: pointer;
    position: relative;
    color: $typeColorWhite;
    &__badge {
      width: 20px;
      height: 20px;
      background-color: #f62f5e;
      position: absolute;
      border-radius: 50%;
      top: -5px;
      left: 10px;
      color: $typeColorWhite;
    }
  }
}
</style>

<script>

import AuthTemp from '@/components/Authentication/AuthTemp.vue'
export default {
  components: {
    AuthTemp
  },
  data() {
    return {
      tlHeaderItems: [
        'Daily Deals',
        'Sell',
        'Help & Contact'
      ]
    }
  },
  mounted() {
    window.onscroll = () => {
      let mq = window.matchMedia('(max-width: 1025px)')
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        if (mq.matches)
          document.querySelector('.navbar-header').style.transform = 'translate(0px, -50px)'
        else
          document.querySelector('.navbar-header').style.transform = 'translate(0px, -50px)'
      } else {
        if (mq.matches)
          document.querySelector('.navbar-header').style.transform = 'translate(0px, 193px)'
        else
          document.querySelector('.navbar-header').style.transform = 'translate(0px, 0px)'
      }
    }
  }
}
</script>
