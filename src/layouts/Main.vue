<template>
  <div>
    <template>
      <b-navbar class="navbar-header">
        <template slot="brand">
          <b-navbar-item href="/">
            <h2 class="bold navbar-header__logo">SHOPMATE</h2>
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item
            v-for="(department, index) in departments"
            :key="department.id"
            class="navbar-header__dropdown_wrapper"
          >
            <b-dropdown
              hoverable
              aria-role="list"
              class="navbar-header__dropdown"
              :class="`navbar-header__dropdown__${department.name}`"
            >
              <div v-on:mouseover="itemHover(department.department_id, index)" slot="trigger">
                <span>{{ department.name }}</span>
              </div>
              <div class="container navbar-header__dropdown_container">
                <b-dropdown-item class="navbar-header__dropdown_group" aria-role="listitem">
                  <span>{{ department.description }}</span>
                  <b-button class="custom-filled-button">Call to action</b-button>
                </b-dropdown-item>
                <div class="flex flex-wrap w-32" v-if="department.categories">
                  <b-dropdown-item
                    v-for="category in department.categories"
                    :key="category.category_id"
                    class="navbar-header__dropdown_item navbar-header__dropdown_single_item"
                    aria-role="listitem"
                  >
                    {{ category.name }}
                    <span class="navbar-header__dropdown_item_hover"></span>
                  </b-dropdown-item>
                </div>
                <div v-else class="flex flex-wrap w-32 navbar-header__loader__wrapper">
                  <b-dropdown-item class="navbar-header__loader" v-for="i in 4" :key="i">
                    <ContentLoader secondaryColor="#bbbbbb" :width="140" :height="25">
                      <rect x="0" y="0" rx="3" ry="3" width="140" height="25" />
                    </ContentLoader>
                  </b-dropdown-item>
                </div>
              </div>
            </b-dropdown>
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item tag="div">
            <div class="buttons">
              <a class="button m-is-outlined navbar-header__signup">
                <strong>Sign up</strong>
              </a>
              <a class="button m-is-filled-white">Log in</a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.navbar-header {
  &__signup {
    margin-right: 30px !important;
  }
  background-color: $docColorFuchsia;
  padding: 5px 50px;
  &__logo {
    letter-spacing: 9px;
  }
  &__dropdown {
    position: static;
    .dropdown-menu {
      width: 75%;
      visibility: hidden;
      opacity: 0;
      transition: 0.3s;
      transform: translate(0px, 10px);
      min-height: 250px;
      padding-top: 0px;
      .dropdown-content {
        min-height: 250px;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
  &__dropdown_container {
    width: 92%;
    display: flex;
  }
  &__dropdown_wrapper {
    position: static;
  }
  &__dropdown_item {
    &:hover {
      .navbar-header__dropdown_item_hover {
        width: 100%;
      }
    }
    &_hover {
      display: flex;
      width: 10px;
      height: 2px;
      background-color: $docColorFuchsia;
      transition: 0.3s;
    }
    display: inline-block;
    padding: 30px 0px 0px 0px;
    width: auto !important;
  }
  &__dropdown_group {
    span {
      font-size: 16px;
      font-weight: bold;
      font-family: $montserrat;
      color: $typeColorWhite;
      white-space: pre-line !important;
      line-height: 30px;
    }
    button {
      display: flex;
      margin-top: 20px;
    }
    padding-top: 30px;
    width: 50% !important;
  }
  &__dropdown__Regional {
    .dropdown-content {
      background-image: url('../assets/images/images-promo1.png');
    }
  }
  &__dropdown__Nature {
    .dropdown-content {
      background-image: url('../assets/images/nature2.jpg');
    }
  }
  &__dropdown__Seasonal {
    .dropdown-content {
      background-image: url('../assets/images/images-shoe1.png');
      background-position: 0px -65px;
    }
  }
  &__loader {
    width: 130px !important;
    padding: 0px !important;
    margin-bottom: 40px;
    &:nth-child(even) {
      margin-left: 50px;
    }
    &__wrapper {
      margin-top: 35px;
    }
  }
  &__dropdown_single_item {
    color: $typeColorWhite;
    font-size: 18px;
    font-weight: bold;
    &:hover {
      color: $typeColorWhite !important;
    }
  }
}

.navbar-item {
  color: $typeColorWhite;
  &:hover {
    color: $typeColorWhite !important;
    background-color: $typoColorFuchsia !important;
    .dropdown-menu {
      visibility: visible;
      opacity: 1;
      transform: translate(0px, 0px);
    }
  }
}

.dropdown-menu {
  display: block;
  &:hover {
    visibility: visible;
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.navbar-menu {
  position: relative;
}

.navbar-start {
  margin-left: 50px;
}
</style>

<script>
import { ContentLoader } from 'vue-content-loader'
// import FullWidthDropDown from '@/components/custom/FullWidthDropDown.vue';
export default {
  name: 'main-layout',
  components: {
    ContentLoader
  },
  async created () {
    this.$_async_query({
      query: {
        path: '/departments',
        g: ''
      },
      done: res => {
        this.departments = res
      }
    })
  },
  mounted () {},
  methods: {
    itemHover (id, index) {
      if (!this.departments[index].categories) {
        this.$_async_query({
          query: {
            path: `/categories/inDepartment/${id}`
          },
          done: res => {
            this.departments[index].categories = res
            this.$forceUpdate()
          }
        })
      }
    }
  },
  data () {
    return {
      departments: []
    }
  }
}
</script>
