<template>
  <q-badge  :style="status.color | formataCorStatus"
            :text-color="status.font_color"
            :label="status.descricao"
            class="text-capitalize"
          />
</template>

<script>
export default {
  name: 'ComponentStatusBadge',
  props: ['status'],
  data () {
    return {}
  },
  filters: {
    formataCorStatus(cor) {
      return `background-color: ${cor}`;
    },    
  }
}
</script>
