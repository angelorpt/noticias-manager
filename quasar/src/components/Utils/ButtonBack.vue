<template>
  <div class="row k-btn-group">
    <div class="col-xs-12 text-right q-gutter-sm k-btn-col-group">

      <q-btn  :label="label ? label : 'Voltar'"
              :to="to"
              v-if="to"
              icon="arrow_back_ios"
              class="k-btn k-btn-cancelar col-xs-6" />

      <q-btn  :label="label ? label : 'Voltar'"
              v-if="!to"
              icon="arrow_back_ios"
              class="k-btn k-btn-cancelar col-xs-6"
              @click="goBack"/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentButtonBack',
  props: {
    label: {
      type    : String,
      default : 'Voltar'
    },
    to: {
      type    : String,
      default : null
    }
  },
  data () {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
}
</script>
