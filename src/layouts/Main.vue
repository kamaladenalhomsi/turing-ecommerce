<template>
  <div>
    <nav class="navbar is-fixed-top navbar-header" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <h2 class="font-bold navbar-header__logo">SHOPMATE</h2>
          </a>
          <a
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
          <div class="navbar-start">
            <navbar-dropdown></navbar-dropdown>
          </div>

          <div class="navbar-end">
            <div class="buttons">
              <a class="button m-is-outlined navbar-header__signup">
                <strong>Sign up</strong>
              </a>
              <a class="button m-is-filled-white">Log in</a>
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
