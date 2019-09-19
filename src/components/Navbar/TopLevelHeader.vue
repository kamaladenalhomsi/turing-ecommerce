<template>
  <div class="top-level-header py-8 lg:py-0 top-level-header-min-h">
    <div class="container flex flex-wrap top-level-header-min-h">
      <div
        nm="topLevelHeader"
        class="w-full top-level-header-min-h justify-center lg:justify-start lg:w-1/3 flex flex items-center py-4 lg:py-0"
      >
        <template v-if="!loggedin">
          <h4 class="mr-4 f-Montserrat font-bold c-white">Hi!</h4>
          <!-- SignUp -->
          <auth-temp
            class="signup-modal"
            :active.sync="signup.active"
            @open="signup.active = true"
            @close="signup.active = false"
            title="Sign up"
            openBtnText="SignUp"
            nm="signup"
          >
            <b-field
              class="custom-input"
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
              class="custom-input"
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
              class="custom-input"
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
                v-validate="'required|min:6'"
              ></b-input>
            </b-field>
            <b-field
              class="custom-input"
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
              nm="signupButton"
            >Sign Up</custom-button>
            <div class="flex justify-center flex-wrap">
              <h4 class="mr-4 f-Montserrat font-bold my-4 w-full text-center">OR</h4>
              <v-facebook-login @login="facebookLogin" app-id="352854622106208">
                <template #login>Sign Up with facebook</template>
              </v-facebook-login>
            </div>
            <div class="mt-4 flex justify-center f-opensans">
              Already a member?
              <a
                class="ml-3 c-fushia"
                @click="login.active = true, signup.active = false"
              >Sign In</a>
            </div>
          </auth-temp>
          <h4 class="ml-4 mr-4 f-Montserrat font-bold c-white">or</h4>
          <!-- Login -->
          <auth-temp
            class="login-modal"
            @open="login.active = true"
            @close="login.active = false"
            :active.sync="login.active"
            title="Login"
            openBtnText="Login"
            nm="login"
          >
            <b-field
              class="custom-input"
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
              class="custom-input"
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
              :loading.sync="login.loading"
              nm="loginButton"
            >Login</custom-button>
            <div class="flex justify-center flex-wrap">
              <h4 class="mr-4 f-Montserrat font-bold my-4 w-full text-center">OR</h4>
              <v-facebook-login @login="facebookLogin" app-id="352854622106208"></v-facebook-login>
            </div>
            <div class="mt-8 flex justify-center f-opensans">
              Don't have an account?
              <a
                class="ml-3 c-fushia"
                @click="login.active = false, signup.active = true"
              >Create one now</a>
            </div>
          </auth-temp>
        </template>
        <template v-else>
          <h4 class="mr-4 f-Montserrat font-bold c-white" nm="customerName">Hi! {{ customer.name }}</h4>
          <router-link
            :to="{name: 'profile'}"
            nm="profile-link"
            class="ml-2 c-fushia font-bold"
          >Profile</router-link>
          <custom-button
            class="ml-4"
            type="outlined"
            @click.native="logout"
            :loading.sync="signup.loading"
            nm="logoutButton"
          >Logout</custom-button>
          <!-- <a href class="ml-4 c-fushia font-bold">Logout</a> -->
        </template>
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
          <h4 class="ml-4 f-Montserrat font-bold c-white">£GB</h4>
        </div>
        <div nm="openCart" class="top-level-header__bag cursor-pointer" @click="openCart">
          <span
            class="top-level-header__bag__badge inline-flex justify-center items-center text-xs font-bold"
          >{{ cart_count }}</span>
          <img :src="require('@/assets/images/icons-bag.png')" alt srcset />
        </div>
        <h4 class="ml-4 f-Montserrat font-bold c-white">Your Bag: £{{ cart_total_amount || 0 }}</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-modal, .signup-modal {
  .modal {
    z-index: 999999999;
  }
}

.v-facebook-login {
  cursor: pointer !important;
}

</style>

<style lang="scss" scoped>
.auth-modal__submit {
  display: block !important;
  width: 175px;
  height: 55px;
  border-radius: 40px !important;
}
.top-level-header-min-h {
  min-height: 50px;
}

.top-level-header {
  width: 100%;
  background-color: $docColorBlack;
  &__item a {
    color: $typeColorWhite;
    @extend .transition;
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
import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component'
import EventBus from '@/eventBus'
import { mapGetters } from 'vuex'
const AuthTemp = () => import(/* webpackPrefetch: true */'@/components/Authentication/AuthTemp.vue')

export default {
  components: {
    AuthTemp,
    VFacebookLogin
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
      },
      profile: {
        active: false
      }
    }
  },
  $_veeValidate: {
    validator: 'new'
  },
  computed: {
    ...mapGetters({
      loggedin: 'customer/GET_IS_LOGGEDIN',
      customer: 'customer/GET_CUSTOMER',
      cart_count: 'cart/GET_CART_COUNT',
      cart_id: 'cart/GET_CART_ID',
      cart_total_amount: 'cart/GET_CART_TOTAL_AMOUNT'
    })
  },
  created() {
    this.$store.dispatch('cart/getTotalAmount', {
      cart_id: this.cart_id
    })
    this.$store.dispatch('cart/getSavedItems', this.cart_id)
    this.$store.dispatch('cart/getCartItems', this.cart_id)
  },
  mounted() {
    EventBus.$on('openLogin', () => {
      this.login.active = true
    })
  },
  methods: {
    openCart() {
      EventBus.$emit('openCart')
    },
    async facebookLogin(response) {
      // Contected
      if (response.authResponse) {
        await this.$_async_mutation({
          mutation: {
            method: 'post',
            path: this.$rest.CUSTOMERS.F_LOGIN(),
            variables: {
              access_token: response.authResponse.accessToken
            }
          },
          done: res => {
            this.$store.commit('customer/SET_TOKEN', res.accessToken)
            this.$store.commit('customer/SET_CUSTOMER', res.customer)
            this.$store.commit('customer/SET_TOKEN_EXPIRE', res.expires_in)
            this.login.active = false
          },
          doneNtf: res => ({
            message: `Welcome back ${res.customer.name}`
          })
        })
        this.login.loading = false
      }
    },
    async createUser() {
      let isVaild = await this.$validator.validateAll('signup')
      if (!isVaild) return true
      this.signup.loading = true
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.CUSTOMERS.ADD(),
          method: 'post',
          variables: this.signup.user
        },
        done: res => {
          // Set user info and token in localstorage and store
          this.$store.commit('customer/SET_TOKEN', res.accessToken)
          this.$store.commit('customer/SET_CUSTOMER', res.customer)
          this.$store.commit('customer/SET_TOKEN_EXPIRE', res.expires_in)
          this.signup.active = false
          // Reset signup data
          this.signup.user = {}
        },
        doneNtf: res => ({
          message: 'User Signed up Successfully!'
        })
      })
      this.signup.loading = false
    },
    async loginUser() {
      let isVaild = await this.$validator.validateAll('login')
      if (!isVaild) return true
      this.login.loading = true
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.CUSTOMERS.LOGIN(),
          method: 'post',
          variables: this.login.user
        },
        done: res => {
          // Set user info and token in localstorage and store
          this.$store.commit('customer/SET_TOKEN', res.accessToken)
          this.$store.commit('customer/SET_CUSTOMER', res.customer)
          this.$store.commit('customer/SET_TOKEN_EXPIRE', res.expires_in)
          this.login.active = false
        },
        doneNtf: res => ({
          message: `Welcome back ${res.customer.name}`
        })
      })
      this.login.loading = false
    },
    logout() {
      // Facebook logout
      if (window.hasOwnProperty('FB')) {
        FB.logout() // eslint-disable-line no-undef
      }
      this.$store.commit('customer/LOGOUT')
      this.$store.commit('cart/REMOVE_ALL_SAVED')
      this.$store.commit('cart/REMOVE_ALL')
      // if user logout in a protected route
      if (this.$route.meta.auth) {
        // Redirect to home
        this.$router.push({
          name: 'home'
        })
      }
      this.$buefy.notification.open({
        message: 'Logouted successfully! we will miss you',
        type: 'is-success',
        duration: 5000,
        position: 'is-bottom-right',
        hasIcon: true,
        iconPack: 'fas'
      })
      // Reset login data
      this.login.user = {}
    }
  }
}
</script>
