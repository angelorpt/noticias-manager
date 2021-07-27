<template>
  <Row class="q-mb-md">

    <div class="col-2 offset-9">
      <Pesquisar @pesquisa="filtrar"></Pesquisar>
    </div>

    <!-- Botão com Icon -->
    <div class="col-1" style="text-align:right;" v-if="icon">
      <q-btn round class="k-btn-new" 
            :icon ="icon" 
            :loading="loading"
            :to="to ? to : ''"
            @click="clickButton"
            v-if="permissao" />
      <q-btn round class="k-btn-new"
            :icon ="icon" 
            :disable="!permissao" 
            v-else />
    </div>

    <!-- Botão com Label -->
    <div class="col-1" style="text-align:right;" v-if="label">
      <q-btn round class="k-btn-new" 
            :label="label" 
            :loading="loading"
            :to="to ? to : ''"
            @click="clickButton"
            v-if="permissao" />
      <q-btn round class="k-btn-new"
            :label="label"
            :disable="!permissao" 
            v-else />
    </div>
  </Row>
</template>

<script>
export default {
  name: 'ComponentPesquisarNew',
  props: ['filtrar', 'permissao', 'loading', 'icon', 'label', 'to'],
  data () {
    return {}
  },
  methods: {
    clickButton() {
      this.$emit('click', true);
    },
  }
}
</script>
