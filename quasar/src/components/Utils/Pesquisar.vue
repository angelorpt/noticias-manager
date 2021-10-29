<template>
  <q-input round borderless label="Pesquisar" class="q-mt-sm" v-model="value">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: "ComponentPesquisar",
  props: ["filtrar"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value() {
      this.$emit("pesquisa", this.value);
    },
  },
};
</script>
