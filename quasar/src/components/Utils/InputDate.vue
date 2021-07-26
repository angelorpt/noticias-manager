<template>
  <q-input  :label="label" class="k-input-pa"
            :value="inner_value"
            @input="handleValue"
            outlined mask="##/##/####"
            :readOnly="readOnly"
            :rules="['date:DD/MM/YYYY']" >
    <template v-slot:append>

      <q-icon name="event" class="cursor-pointer text-indigo">

        <q-popup-proxy  ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale" >

          <q-date :value="inner_value"
                  v-if="!readOnly"
                  @input="handleValue"
                  mask="DD/MM/YYYY" />

        </q-popup-proxy>

      </q-icon>

    </template>
  </q-input>
</template>

<script>
export default {
  name: 'ComponentInputDate',
  props: ['value', 'label', 'readOnly'],
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
    handleValue(data_sel) {
      data_sel = (data_sel == '' || data_sel == undefined || !this.$moment(data_sel, 'DD/MM/YYYY').isValid()) ? null : data_sel;
      this.$emit('input', data_sel)
      this.$refs.qDateProxy.hide()
    }
  },
}
</script>