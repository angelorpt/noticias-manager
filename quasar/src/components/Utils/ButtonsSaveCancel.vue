<template>
  <div class="row k-btn-group">
    <div class="col-xs-12 text-right q-gutter-sm k-btn-col-group">

      <!-- Cancelar -->
      <q-btn  v-if="toCancel"
              :label="labelCancel ? labelCancel : 'Cancelar'"
              class="k-btn k-btn-cancelar col-xs-6"
              icon="cancel"
              :to="toCancel" />

      <q-btn  v-else
              :label="labelCancel ? labelCancel : 'Cancelar'"
              class="k-btn k-btn-cancelar col-xs-6"
              icon="cancel"
              @click.stop.prevent="cancelClick" />

      <!-- Salvar / Atualizar -->
      <q-btn   v-if="permissao"
              :label="labelSave" 
              :loading="loading"
              icon="save"
              class="k-btn k-btn-salvar col-xs-6"
              @click.prevent.stop="saveClick" />

      <q-btn   v-else
              :label="labelSave"
              :disable="!permissao"
              icon="save"
              class="k-btn k-btn-salvar col-xs-6" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentButtonsSaveCancel',
  props: ['labelSave', 'labelCancel', 'toCancel', 'loading', 'permissao'],
  data () {
    return {}
  },
  methods: {
    saveClick() {
      this.$emit('saveClick', true)
    },
    cancelClick() {
      this.$emit('cancelClick', true)
    }
  },
}
</script>
