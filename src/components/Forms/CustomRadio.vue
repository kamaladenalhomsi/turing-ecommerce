<template>
  <b-radio ref="radio" @input="radioChecked" v-model="radio" native-value="info" type="is-info">Info</b-radio>
</template>

<script>
export default {
  name: 'custom-radio',
  props: {
    value: String
  },
  data() {
    return {
      radio: ''
    }
  },
  methods: {
    radioChecked() {
      this.$emit('input', this.radio)
      let check = document.querySelector('.check');
      console.log(check, "check");
    }
  }
}
</script>
