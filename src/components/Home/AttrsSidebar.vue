<template>
  <div>
    <div class="attrs-sidebar mx-auto md:mx-0">
      <div class="attrs-sidebar__main_wrapper">
        <span>Filter 486 items</span>
        <div class="attrs-sidebar__cat flex items-center mt-4 f-opensans">
          <i class="fas fa-times mr-2 text-sm"></i>
          <span class="mr-2 attrs-sidebar__cat__key">Gender:</span>
          <span>Woman</span>
        </div>
        <div class="attrs-sidebar__cat flex items-center mt-4 f-opensans">
          <i class="fas fa-times mr-2 text-sm"></i>
          <span class="mr-2 attrs-sidebar__cat__key">Category:</span>
          <span>Dresses</span>
        </div>
      </div>
      <div>
        <div class="attrs-sidebar__attrs">
          <size-attributes
            :title="attributes[0] ? attributes[0].name: ''"
            :items="attributes[0] ? attributes[0].items : []"
          ></size-attributes>
          <color-attributes
            :title="attributes[1] ? attributes[1].name: ''"
            :items="attributes[1] ? attributes[1].items : []"
          ></color-attributes>
        </div>
        <div class="attrs-sidebar__attrs">
          <div class="attrs-sidebar__attrs__section">
            <h4 class="f-montserrat font-bold attrs-sidebar__attrs__section__title">Price Range</h4>
            <b-field class="flex-wrap">
              <b-slider v-model="numbers" type="is-danger" :min="4" :max="28" :step="1"></b-slider>
              <div class="w-full flex justify-between">
                <h4 class="c-gray font-bold">£4</h4>
                <h4 class="c-gray font-bold">£28</h4>
              </div>
            </b-field>
          </div>
        </div>
      </div>
      <div class="attrs-sidebar__buttons mt-2 flex justify-between items-center">
        <custom-button type="filled-fuchsia" size="large">Apply</custom-button>
        <custom-button type="pure" size="large" icon="fas fa-times">Clear</custom-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.attrs-sidebar {
  width: 90%;
  background-color: #FAFAFA;
  &__main_wrapper, &__buttons  {
    padding: 20px;
  }
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.20);
  &__cat {
    &__key {
      color: #A6A6A6;
    }
    &__value {
      color: #6C6C6C
    }
  }
  &__attrs {
    padding: 10px 20px 0px 20px;
    background-color: $docColorWhite;
    &:first-child {
      padding: 20px 20px 0px 20px;
    }
    &:last-child {
      padding-bottom: 20px
    }
    &__section {
      &__title {
        color: #B4B4B4
      }
    }
  }

}

.field:first-child {
  margin-left: 0px
}

.radio-button {
  label {
    padding: 6px 40px;
    background-color: #EFEFEF;
    border: 0px;
    width: 100%
  }
  &__placeholder {
    width: 97px;
  }
}

.b-slider-thumb {
  border-radius: 50% !important;
  background-color: $docColorFuchsia !important;
  border: 2px solid $docColorWhite !important;
}

.b-slider-track {
  background-color: #EFEFEF !important;
}

.b-slider {
  margin-bottom: 3px !important
}

.pure-btn {
  background-color: transparent !important;
  border: 0px !important;
  width: 100px;
  color: $typoColorFuchsia !important;
}

// Media Query
@media screen and (min-width: 500px) {
  .radio-button {
    label {
      padding: 6px 40px;
      background-color: #EFEFEF;
      border: 0px;
      width: auto
    }
    &__placeholder:nth-child(3n+1), &:nth-child(3n+1) {
      margin-left: 0px
    }
    &__placeholder:nth-child(-n+3), &:nth-child(-n+3) {
      margin-top: 0px
    }
  }
}

</style>

<script>
import SizeAttributes from './Sidebar/SizeAttributes'
import ColorAttributes from './Sidebar/ColorAttributes'
export default {
  name: 'attrs-sidebar',
  props: {
    attributes: {
      type: Array
    }
  },
  components: {
    SizeAttributes,
    ColorAttributes
  },
  watch: {
    attributes: {
      handler(vals) {
        console.log(vals, 'vals')
      }
    }
  },
  data() {
    return {
      numbers: [12, 20],
      radio: '',
      radioButton: '',
      coloresRadio: [
        'default',
        'info',
        'success',
        'danger',
        'warning'
      ],
      sizes: [
        'XS',
        'S',
        'M',
        'L',
        'XL'
      ]
    }
  },
  methods: {

  }
}
</script>
