<template>
  <q-page padding>
    <Container>
      <Titulo titulo="Noticia" subtitulo="Visualizar Dados do Noticia" />

      <LabelGroup label="Dados" />
      <Row>
        <Input
          label="Fonte"
          v-model="noticia.fonte"
          class="col-2"
          disabled
          :loading="loading"
        />
        <Input label="URL" v-model="noticia.url" class="col-8" disabled />
        <Input
          label="Publicação"
          v-model="noticia.data_publicacao"
          class="col-2"
          :loading="loading"
          disabled
        />
      </Row>

      <Row>
        <Input
          label="Título"
          v-model="noticia.titulo"
          class="col-12"
          :loading="loading"
          disabled
        />
      </Row>
      <Row>
        <Input
          label="Sub-título"
          v-model="noticia.subtitulo"
          class="col-12"
          :loading="loading"
          disabled
        />
      </Row>
      <Row>
        <Input
          label="Conteúdo"
          class="col-12"
          :loading="loading"
          type="textarea"
          disabled
        />
      </Row>

      <ButtonBack />
    </Container>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "PageNoticiaVisualizar",
  props: ["noticia_id"],
  data() {
    return {
      noticia: {
        id: null,
        titulo: null,
        subtitulo: null,
        data_publicacao: null,
        fonte: null,
        url: null,
        conteudo: null
      }
    };
  },
  mounted() {
    if (this.noticia_id) {
      this.loadNoticia(this.noticia_id);
    }
  },
  watch: {
    noticia_id() {
      if (this.noticia_id) {
        this.loadNoticia(this.noticia_id);
      }
    },
    getNoticia() {
      this.noticia = this.getNoticia;
    }
  },
  computed: {
    ...mapState("Noticia", ["loading"]),
    ...mapGetters("Noticia", ["getNoticia"])
  },
  methods: {
    ...mapActions("Noticia", ["loadNoticia"])
  }
};
</script>
