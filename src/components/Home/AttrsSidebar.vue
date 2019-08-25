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
          <div class="attrs-sidebar__attrs__section">
            <h4 class="f-montserrat font-bold attrs-sidebar__attrs__section__title">Color</h4>
            <div class="flex mt-4">
              <div class="field ml-4" v-for="type in coloresRadio" :key="type">
                <b-radio v-model="radio" :native-value="type" :type="'is-' + type"></b-radio>
              </div>
            </div>
          </div>
        </div>
        <div class="attrs-sidebar__attrs">
          <div class="attrs-sidebar__attrs__section">
            <h4 class="f-montserrat font-bold attrs-sidebar__attrs__section__title">Sizes</h4>
            <div class="flex mt-4">
              <b-field class="flex-wrap">
                <b-radio-button
                  v-for="size in sizes"
                  :key="size"
                  class="radio-button md:ml-2 mt-2 w-full md:w-auto"
                  v-model="radioButton"
                  :native-value="size"
                >{{ size }}</b-radio-button>
              </b-field>
            </div>
          </div>
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
        <b-button class="m-is-filled-fuchsia btn-size-large">Apply</b-button>
        <b-button class="pure-btn">
          <i class="fas fa-times pr-2"></i>
          Clear
        </b-button>
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
    &:nth-child(3n+1) {
      margin-left: 0px
    }
    &:nth-child(-n+3) {
      margin-top: 0px
    }
  }
}

</style>

<script>

export default {
  name: 'attrs-sidebar',
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
