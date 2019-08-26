<template>
  <div class="attrs-sidebar__attrs__section">
    <h4
      class="f-montserrat font-bold attrs-sidebar__attrs__section__title mt-4"
      v-if="title"
    >{{ title }}</h4>
    <div class="w-16 mt-8" v-else>
      <ContentLoader secondaryColor="#ddd" :width="30" :height="10">
        <rect x="0" y="0" rx="3" ry="3" width="30" height="10" />
      </ContentLoader>
    </div>
    <div class="flex flex-wrap mt-4" v-if="items && title === 'Color'">
      <div class="field ml-1" v-for="type in items" :key="type.attribute_value_id">
        <b-radio v-model="radio" :native-value="type.value" :type="'is-' + type.value"></b-radio>
      </div>
    </div>
    <div v-else class="flex flex-wrap w-full py-30">
      <div v-for="i in 4" :key="i" class="w-8 mt-3 ml-2">
        <ContentLoader secondaryColor="#ddd" :width="30" :height="30">
          <circle cx="16.49" cy="17.47" r="11.8" />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'color-attributes',
  components: {
    ContentLoader
  },
  props: {
    title: {
      type: String
    },
    items: {
      type: Array
    }
  },
  data() {
    return {
      radio: ''
    }
  }
}
</script>
