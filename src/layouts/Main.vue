<template>
  <div>
    <template>
      <b-navbar class="navbar-header md:px-20">
        <template slot="brand">
          <b-navbar-item href="/">
            <h2 class="font-bold navbar-header__logo">SHOPMATE</h2>
          </b-navbar-item>
        </template>
        <template slot="start">
          <navbar-dropdown></navbar-dropdown>
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
    <template>
      <Footer></Footer>
    </template>
  </div>
</template>

<style lang="scss">

// Main Footer

.main-footer {
  background-color: $docColorBlack;
  width: 100%;
  position: absolute;
  // bottom: -256px;
  padding: 20px 0px;
  .footer-social-link {
    margin-left: 20px;
    &:first-child {
      margin-left: 0px
    }
  }
  &__list {
    li {
      margin-top: 5px;
      a {
      transition: 0.3s;
        &:hover {
          color: $typoColorFuchsia;
        }
      }
    }
  }
}

// Navbar Header

.navbar-header {
  // Sign up button
  &__signup {
    margin-right: 30px !important;
  }
  background-color: $docColorFuchsia;
  // Logo
  &__logo {
    letter-spacing: 9px;
  }
  // Dropdown
  &__dropdown {
    position: static;
    .dropdown-menu {
      visibility: hidden;
      opacity: 0;
      transition: 0.3s;
      transform: translate(0px, 10px);
      min-height: 250px;
      padding-top: 0px;
      .dropdown-content {
        min-height: 250px;
        padding-bottom: 20px;
        background-repeat: no-repeat;
      }
    }
  }
  &__dropdown_container {
    width: 92%;
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

// Navbar Item

.navbar-item {
  height: 100%;
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
  background-color: transparent;
}

.navbar-start {
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px
}

// Media Query
@media screen and (min-width: 1000px) {
  .navbar-header {
    &__dropdown {
      .dropdown-menu {
        width: 75%;
        .dropdown-content {
          background-position-y: -80px;
          background-size: cover;
        }
      }
    }
  }
}

</style>

<script>
import { ContentLoader } from 'vue-content-loader'
import NavbarDropdown from '@/components/Navbar/NavbarDropdown.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  name: 'main-layout',
  components: {
    ContentLoader,
    NavbarDropdown,
    Footer
  },
  async created () {
    // Fetch All departments
    this.$_async_query({
      query: {
        action: 'department/getAllDepartments'
      },
      done: res => {
        res.forEach(department => {
          this.$_async_query({
            query: {
              action: 'department/getDepartmentCategories',
              variables: {
                params: {
                  id: department.department_id
                }
              }
            },
            done: res => {
              this.$forceUpdate()
            }
          })
        })
      }
    })
  }
}
</script>
