<template>
  <q-input  :label="label"
            :counter="counter"
            :value="inner_value"
            :mask="mask"
            :rules="rules"
            :readonly="disabled"
            @input="handleValue"
            @blur="$emit('blur', value)"
            type="text"
            class="k-input-pa"
            outlined >
  </q-input>
</template>

<script>
export default {
  name: 'ComponentInputDate',
  props: ['value', 'label', 'counter', 'mask', 'rules', 'disabled'],
  data () {
    return {
      inner_value: null
    }
  },
  mounted() {
    this.inner_value = this.value
  },
  watch: {
    value() {
      this.inner_value = this.value
    }
  },
  methods: {
    handleValue(texto) {
      texto = (texto == '' || texto == undefined) ? '' : texto;
      this.$emit('input', texto)
    }
  },
}
</script>