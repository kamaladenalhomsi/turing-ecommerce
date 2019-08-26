<template>
  <div class="flex w-full">
    <b-navbar-item
      v-for="(department) in departments"
      :key="department.id"
      class="navbar-header__dropdown_wrapper"
    >
      <b-dropdown
        hoverable
        aria-role="list"
        class="navbar-header__dropdown"
        :class="`navbar-header__dropdown__${department.name}`"
      >
        <div slot="trigger">
          <span class="font-bold">{{ department.name }}</span>
        </div>
        <div class="container navbar-header__dropdown_container flex flex-wrap">
          <b-dropdown-item
            :custom="true"
            class="navbar-header__dropdown_group w-full md:w-1/2"
            aria-role="listitem"
          >
            <span class="block w-11/12">{{ department.description }}</span>
            <b-button class="m-is-filled-fuchsia">Call to action</b-button>
          </b-dropdown-item>
          <div class="flex flex-wrap w-full mx-10 md:mx-0 md:w-1/3">
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
        </div>
      </b-dropdown>
    </b-navbar-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar-dropdown',
  computed: {
    ...mapGetters({
      departments: 'department/GET_ALL_DEPARTMENTS'
    })
  }
}
</script>
