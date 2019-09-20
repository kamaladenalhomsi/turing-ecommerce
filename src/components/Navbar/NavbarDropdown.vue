<template>
  <div class="dropdown-component flex w-full h-full justify-center lg:justify-start">
    <b-navbar-item
      v-for="(department) in departments"
      :key="department.department_id"
      class="dropdown-component__dropdown_wrapper"
      :class="[{ 'navbar-item__active': active === department.department_id}]"
    >
      <b-dropdown
        hoverable
        aria-role="list"
        class="dropdown-component__dropdown h-full"
        :class="`dropdown-component__dropdown__${department.name}`"
      >
        <div
          @click="chooseDepartment(department), active = department.department_id"
          slot="trigger"
          class="h-full px-5 py-5 flex items-center"
        >
          <span class="font-bold">{{ department.name }}</span>
        </div>
        <div class="container dropdown-component__dropdown_container flex flex-wrap">
          <b-dropdown-item
            :custom="true"
            class="dropdown-component__dropdown_group w-full md:w-1/2"
            aria-role="listitem"
          >
            <span class="block w-11/12">{{ department.description }}</span>
            <custom-button
              type="filled-fuchsia"
              @click.native="chooseDepartment(department), active = department.department_id"
            >Call to action</custom-button>
          </b-dropdown-item>
          <div class="flex flex-wrap w-full mx-10 md:mx-0 md:w-1/2">
            <b-dropdown-item
              @click="chooseCategory(category), active = department.department_id, childActive = category.category_id"
              v-for="category in department.categories"
              :key="category.category_id"
              class="dropdown-component__dropdown_item dropdown-component__dropdown_single_item"
              :class="[{'dropdown-component__dropdown_item__active': childActive === category.category_id}]"
              aria-role="listitem"
              :nm="category.category_id"
            >
              {{ category.name }}
              <span class="dropdown-component__dropdown_item_hover"></span>
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

.dropdown-component {
  &__trigger {
    padding: 15px 20px;
  }
  // Dropdown
  &__dropdown {
    position: static;
    .dropdown-menu {
      visibility: hidden;
      opacity: 0;
      @extend .transition;
      transform: translate(0px, 10px);
      min-height: 250px;
      padding-top: 0px;
      .dropdown-content {
        min-height: 250px;
        padding-bottom: 20px;
        background-repeat: no-repeat;
        background-size: cover;
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
      .dropdown-component__dropdown_item_hover {
        width: 100%;
      }
    }
    &:hover {
      .dropdown-component__dropdown_item_hover {
        width: 100%;
      }
    }
    &_hover {
      display: flex;
      width: 10px;
      height: 2px;
      background-color: $docColorFuchsia;
      @extend .transition;
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
      background-image: url('../../assets/images/images-promo1.jpeg');
    }
  }
  &__dropdown__Nature {
    .dropdown-content {
      background-image: url('../../assets/images/nature2.jpeg');
    }
  }
  &__dropdown__Seasonal {
    .dropdown-content {
      background-image: url('../../assets/images/images-shoe1.jpeg');
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

.dropdown-menu {
  display: block;
  &:hover {
    visibility: visible;
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dropdown-component',
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
      // redirect to home if vistior is not there
      if (this.$route.name !== 'home')
        this.$router.push({
          name: 'home'
        })
    },
    chooseDepartment(department) {
      this.$store.commit('product/PUSH_DEPARTMENT', department)
      // redirect to home if vistior is not there
      if (this.$route.name !== 'home')
        this.$router.push({
          name: 'home'
        })
    }
  }
}
</script>
