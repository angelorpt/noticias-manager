<template>
  <q-select :label="label"
            :loading="loading"
            :options="options"
            v-model="inner_value"
            class="k-input-pa"
            outlined />
</template>

<script>
export default {
  name: 'ComponentInputDate',
  props: ['value', 'label', 'options', 'loading'],
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
    },
    inner_value: {
      handler: function () {
        this.$emit('input', this.inner_value);
      },
      deep: true
    }    
  },
}
</script>