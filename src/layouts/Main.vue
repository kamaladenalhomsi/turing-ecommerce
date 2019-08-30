<template>
  <div>
    <top-level-header></top-level-header>
    <nav class="navbar navbar-header" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand items-center px-10 md:px-0">
          <a class="navbar-item" href="https://bulma.io">
            <h2 class="font-bold navbar-header__logo">SHOPMATE</h2>
          </a>
          <a
            @click="toggle"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start ml-0 lg:ml-20">
            <navbar-dropdown></navbar-dropdown>
          </div>

          <div class="navbar-end py-4 md:py-0 flex justify-center">
            <div class="buttons">
              <a class="button m-is-outlined navbar-header__signup">
                <strong>Sign up</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <template>
      <Footer></Footer>
    </template>
  </div>
</template>

<style lang="scss">

// Wrapper
.wrapper {
  padding-top: 80px
}

.navbar-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px !important;
  background-color: $docColorFuchsia;
  transition: 0.3s;
  // Logo
  &__logo {
    letter-spacing: 9px;
    &:hover {
      color: $typeColorWhite;
    }
  }
}

.navbar-menu {
  position: relative;
  background-color: transparent;
}

// Navbar Item
.navbar-item {
  height: 100%;
  color: $typeColorWhite;
  padding: 0px !important;
  &:hover {
    color: $typeColorWhite;
    background-color: $typoColorFuchsia;
    .dropdown-menu {
      visibility: visible;
      opacity: 1;
      transform: translate(0px, 0px);
    }
  }
  &__active {
    color: $typoColorFuchsia !important;
    background-color: $docColorWhite !important;
  }
}

.navbar-start {
  display: flex;
  height: 100%;
  align-items: center;
}

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

// Media Query
@media screen and (min-width: 1000px) {
  .dropdown-component {
    &__dropdown {
      .dropdown-menu {
        width: 90%;
        .dropdown-content {
          background-position-y: -40px;
          background-size: cover;
        }
      }
    }
  }
}

@media screen and (max-width: 1025) {
  .navbar-header {
    top: 243px !important;
  }
}

</style>

<script>
import { ContentLoader } from 'vue-content-loader'
import NavbarDropdown from '@/components/Navbar/NavbarDropdown.vue'
import Footer from '@/components/Footer/Footer.vue'
import AuthTemp from '@/components/Authentication/AuthTemp.vue'
import TopLevelHeader from '@/components/Navbar/TopLevelHeader.vue'

export default {
  name: 'main-layout',
  components: {
    ContentLoader,
    NavbarDropdown,
    Footer,
    AuthTemp,
    TopLevelHeader
  },
  methods: {
    toggle() {
      document.querySelector('.navbar-menu').classList.toggle('is-active')
    }
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
