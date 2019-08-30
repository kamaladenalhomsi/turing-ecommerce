<template>
  <div class="flex w-full h-full">
    <b-navbar-item
      v-for="(department) in departments"
      :key="department.department_id"
      class="navbar-header__dropdown_wrapper"
      :class="[{ 'navbar-item__active': active === department.department_id}]"
    >
      <b-dropdown
        hoverable
        aria-role="list"
        class="navbar-header__dropdown h-full"
        :class="`navbar-header__dropdown__${department.name}`"
      >
        <div
          @click="chooseDepartment(department), active = department.department_id"
          slot="trigger"
          class="h-full px-5 py-5 flex items-center"
        >
          <span class="font-bold">{{ department.name }}</span>
        </div>
        <div class="container navbar-header__dropdown_container flex flex-wrap">
          <b-dropdown-item
            :custom="true"
            class="navbar-header__dropdown_group w-full md:w-1/2"
            aria-role="listitem"
          >
            <span class="block w-11/12">{{ department.description }}</span>
            <custom-button
              type="filled-fuchsia"
              @click.native="chooseDepartment(department), active = department.department_id"
            >Call to action</custom-button>
          </b-dropdown-item>
          <div class="flex flex-wrap w-full mx-10 md:mx-0 md:w-1/3">
            <b-dropdown-item
              @click="chooseCategory(category), active = department.department_id, childActive = category.category_id"
              v-for="category in department.categories"
              :key="category.category_id"
              class="navbar-header__dropdown_item navbar-header__dropdown_single_item"
              :class="[{'navbar-header__dropdown_item__active': childActive === category.category_id}]"
              aria-role="listitem"
              :nm="category.category_id"
            >
              {{ category.name }}
              <span class="navbar-header__dropdown_item_hover"></span>
            </b-dropdown-item>
          </div>
        </div>
      </b-dropdown>
    </b-navbar-item>
  </div>
</template>

<style lang="scss">

.dropdown-trigger {
  height: 100%;
}

// Navbar Header

.navbar-header {
  &__trigger {
    padding: 15px 20px;
  }
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
    &__active {
      .navbar-header__dropdown_item_hover {
        width: 100%;
      }
    }
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
      background-image: url('../../assets/images/images-promo1.png');
    }
  }
  &__dropdown__Nature {
    .dropdown-content {
      background-image: url('../../assets/images/nature2.jpg');
    }
  }
  &__dropdown__Seasonal {
    .dropdown-content {
      background-image: url('../../assets/images/images-shoe1.png');
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

.navbar-start {
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 60px;
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
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar-dropdown',
  computed: {
    ...mapGetters({
      departments: 'department/GET_ALL_DEPARTMENTS'
    })
  },
  data() {
    return {
      active: null,
      childActive: null
    }
  },
  methods: {
    chooseCategory(category) {
      this.$store.commit('product/PUSH_CATEGORY', category)
    },
    chooseDepartment(department) {
      this.$store.commit('product/PUSH_DEPARTMENT', department)
    }
  }
}
</script>
