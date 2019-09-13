<template>
  <div class="attrs-sidebar__attrs__section">
    <h4 class="f-montserrat font-bold attrs-sidebar__attrs__section__title" v-if="title">{{ title }}</h4>
    <div class="w-16" v-else>
      <ContentLoader secondaryColor="#ddd" :width="30" :height="10">
        <rect x="0" y="0" rx="3" ry="3" width="30" height="10" />
      </ContentLoader>
    </div>
    <div class="flex mt-4">
      <b-field v-if="items && title === 'Size'" class="flex-wrap">
        <b-radio-button
          v-for="size in items"
          nm="sizeAttr"
          :key="size.attribute_value_id"
          class="radio-button md:ml-2 mt-2 w-full md:w-auto"
          v-model="radioButton"
          :native-value="size.value"
        >{{ size.value }}</b-radio-button>
      </b-field>
      <div v-else class="flex flex-wrap w-full mb-4">
        <div v-for="i in 4" :key="i" class="radio-button__placeholder mt-3 ml-2">
          <ContentLoader secondaryColor="#ddd" :width="30" :height="10">
            <rect x="0" y="0" rx="3" ry="3" width="30" height="10" />
          </ContentLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'size-attributes',
  components: {
    ContentLoader
  },
  props: {
    title: {
      type: String
    },
    items: {
      type: Array
    },
    value: {
      type: String
    }
  },
  watch: {
    radioButton: {
      handler(value) {
        this.$emit('input', value)
      }
    },
    value: {
      handler(val) {
        this.radioButton = val
      }
    }
  },
  data () {
    return {
      radioButton: ''
    }
  }
}
</script>
