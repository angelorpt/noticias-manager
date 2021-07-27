<template>
  <div class="row">
    <div class="col-12">
      <p class="k-title-page">{{titulo}}</p>
      <p class="k-subtitle-page" v-if="subtitulo">{{subtitulo}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentTituloPagina',
  props: ['titulo', 'subtitulo'], 
  data () {
    return {}
  }
}
</script>
