<template>
  <q-page>
    <Container>
      <Titulo titulo="Notícias" subtitulo="Visualize as notícias publicadas" />

      <PesquisarNew
        icon="description"
        :filtrar="filtrar"
        :permissao="true"
        to="/noticias/novo"
      />

      <Row class="q-mt-md">
        <Table
          :columns="colunas"
          :data="lstNoticias_filter"
          :actions="botoesAcao"
          :loading="loading"
          @reload="loadDados"
          class="col-12"
        />
      </Row>
    </Container>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "PageNoticiasIndex",
  data() {
    return {
      colunas: [
        { label: "Fonte", field: "fonte" },
        { label: "Publicação", field: "data_publicacao" },
        { label: "Titulo", field: "titulo", align: "left" },
        { label: "Subtitulo", field: "subtitulo", align: "left" },
        { label: "URL", field: "url", align: "left" },
        { label: "Ações", sort: false }
      ],

      botoesAcao: [],
      lstNoticias_filter: []
    };
  },
  mounted() {
    this.gerarBotoesAcao();
    this.loadDados();
  },
  watch: {
    listaNoticiasToTable() {
      this.lstNoticias_filter = this.listaNoticiasToTable;
    }
  },
  computed: {
    ...mapState("Noticia", ["loading", "lstNoticias"]),

    ...mapGetters("Noticia", ["listaNoticiasToTable"])
  },
  methods: {
    ...mapActions("Noticia", ["loadNoticias"]),

    gerarBotoesAcao() {
      this.botoesAcao = [
        {
          icon: "remove_red_eye",
          to: "/noticias/visualizar/{field}",
          fieldToRoute: "id",
          tooltip: "Visualizar Notícia",
          permission: true
        }
      ];
    },

    filtrar(filtro) {
      console.log(filtro);
      console.log(this.listaNoticiasToTable);
      let arrayKeys = [
        "fonte",
        "url",
        "titulo",
        "subtitulo",
        "data_publicacao"
      ];
      this.lstNoticias_filter = this.filterArray(
        this.listaNoticiasToTable,
        arrayKeys,
        filtro,
        "id"
      );
    },

    loadDados() {
      this.loadNoticias();
    }
  } // methods
};
</script>
