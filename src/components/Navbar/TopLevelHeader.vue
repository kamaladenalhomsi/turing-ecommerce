<template>
  <div class="top-level-header py-8 lg:py-0 top-level-header-min-h">
    <div class="container flex flex-wrap top-level-header-min-h">
      <div
        class="w-full top-level-header-min-h justify-center lg:justify-start lg:w-1/3 flex flex items-center py-4 lg:py-0"
      >
        <h4 class="mr-4 f-Montserrat font-bold c-white">Hi!</h4>
        <auth-temp
          :active.sync="signup.active"
          @open="signup.active = true"
          @close="signup.active = false"
          title="Sign up"
          openBtnText="SignUp"
        >
          <b-field
            :message="server_errors.name || errors.first('signup.name')"
            :type="server_errors.name || errors.first('signup.name') ? 'is-danger' : ''"
          >
            <b-input
              v-model="signup.user.name"
              placeholder="Full Name"
              data-vv-name="name"
              data-vv-scope="signup"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            :message="server_errors.email || errors.first('signup.email')"
            :type="server_errors.email || errors.first('signup.email') ? 'is-danger' : ''"
          >
            <b-input
              v-model="signup.user.email"
              data-vv-name="email"
              data-vv-scope="signup"
              placeholder="Email"
              v-validate="'required|email'"
            ></b-input>
          </b-field>
          <b-field
            :message="server_errors.password || errors.first('signup.password')"
            :type="server_errors.password || errors.first('signup.password') ? 'is-danger' : ''"
          >
            <b-input
              v-model="signup.user.password"
              ref="password"
              data-vv-name="password"
              data-vv-scope="signup"
              type="password"
              placeholder="Password"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            :message="errors.first('signup.password_confirmation')"
            :type="errors.first('signup.password_confirmation') ? 'is-danger' : ''"
          >
            <b-input
              v-validate="'required|confirmed:password'"
              data-vv-name="password_confirmation"
              type="password"
              placeholder="Re-type password"
              data-vv-as="password"
            ></b-input>
          </b-field>
          <custom-button
            class="auth-modal__submit mt-8 mx-auto"
            size="large"
            type="filled-fuchsia"
            @click.native="createUser"
            :loading.sync="signup.loading"
          >Sign Up</custom-button>
          <div class="mt-4 flex justify-center f-opensans">
            Already a member?
            <a class="ml-3 c-fushia">Sign In</a>
          </div>
        </auth-temp>
        <h4 class="ml-4 mr-4 f-Montserrat font-bold c-white">or</h4>
        <auth-temp
          @open="login.active = true"
          @close="login.active = false"
          :active.sync="login.active"
          title="Login"
          openBtnText="Login"
        >
          <b-field
            :message="server_errors.email || errors.first('login.email')"
            :type="server_errors.email || errors.first('login.email') ? 'is-danger' : ''"
          >
            <b-input
              v-model="login.user.email"
              data-vv-name="email"
              data-vv-scope="login"
              placeholder="Email"
              v-validate="'required|email'"
            ></b-input>
          </b-field>
          <b-field
            :message="server_errors.password || errors.first('login.password')"
            :type="server_errors.password || errors.first('login.password') ? 'is-danger' : ''"
          >
            <b-input
              v-model="login.user.password"
              ref="password"
              data-vv-name="password"
              data-vv-scope="login"
              type="password"
              placeholder="Password"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <custom-button
            class="auth-modal__submit mt-8 mx-auto"
            size="large"
            type="filled-fuchsia"
            @click.native="loginUser"
          >Login</custom-button>
          <div class="mt-8 flex justify-center f-opensans">
            Don't have an account?
            <a class="ml-3 c-fushia">Create one now</a>
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
      ],
      signup: {
        user: {},
        loading: false,
        active: false
      },
      login: {
        user: {},
        active: false,
        loading: false
      }
    }
  },
  $_veeValidate: {
    validator: 'new'
  },
  methods: {
    async createUser() {
      this.signup.loading = true
      await this.$_async_mutation({
        mutation: {
          path: '/customers',
          method: 'post',
          variables: this.signup.user
        },
        done: res => {
          this.signup.active = false
        },
        doneNtf: {
          message: 'User Signed up Successfully!'
        },
        badRequestNtf: {}
      })
      this.signup.loading = false
    },
    async loginUser() {
      this.login.loading = true
      await this.$_async_mutation({
        mutation: {
          path: '/customers/login',
          method: 'post',
          variables: this.login.user
        },
        done: res => {
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('customer', JSON.stringify(res.customer))
          localStorage.setItem('token_expire', res.expires_in)
          this.login.active = false
        },
        doneNtf: {
          // message: `Welcome back ${res.customer.name}`
        }
      })
    }
  }
}
</script>
