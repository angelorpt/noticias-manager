import Vue from "vue";

export default {
  namespaced: true,

  state: () => {
    return {
      lstNoticias: [],
      noticia: {},
      loading: false
    };
  },

  mutations: {
    setLstNoticias(state, lista) {
      state.lstNoticias = lista;
    },
    setNoticia(state, objeto) {
      state.noticia = objeto;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },

  actions: {
    async loadNoticias({ commit }) {
      commit("setLoading", true);
      try {
        const response = await Vue.prototype.$axios.get("/noticias/elastic");
        commit("setLstNoticias", response.data.hits.hits);
      } catch (error) {
        commit("setLstNoticias", []);
      }
      commit("setLoading", false);
    },

    async loadNoticia({ commit }, noticiaId) {
      commit("setLoading", true);
      try {
        const response = await Vue.prototype.$axios.get(
          `/noticias/elastic/${noticiaId}`
        );
        commit("setNoticia", response.data);
      } catch (error) {
        commit("setNoticia", {});
      }
      commit("setLoading", false);
    }
  }, // actions

  getters: {
    listaNoticiasToTable(state) {
      let lstClone = [...state.lstNoticias];
      let lstSorted = lstClone.sort((a, b) =>
        a._source.data_publicacao > b._source.data_publicacao
          ? 1
          : a._source.data_publicacao < b._source.data_publicacao
          ? -1
          : 0
      );
      let lista = lstSorted.map(item => {
        return {
          ...item,
          data_publicacao: Vue.prototype
            .$moment(item._source.data_publicacao)
            .format("DD/MM/YYYY HH:MM"),
          titulo: item._source.titulo.substring(0, 49) + "...",
          subtitulo: item._source.subtitulo.substring(0, 45) + "...",
          url: item._source.url.substring(0, 30) + "...",
          fonte: item._source.fonte,
          id: item._source.id
        };
      });

      return lista;
    },

    getNoticia({ noticia }) {
      if (!noticia) {
        return {};
      }
      let noticiaNew = {
        ...noticia,
        id: noticia._source.id,
        data_publicacao: Vue.prototype
          .$moment(noticia._source.data_publicacao)
          .format("DD/MM/YYYY HH:MM"),
        titulo: noticia._source.titulo,
        subtitulo: noticia._source.subtitulo,
        url: noticia._source.url,
        fonte: noticia._source.fonte,
        conteudo: noticia._source.conteudo
      };
      const noticiaClone = Vue.prototype.$_.cloneDeep(noticiaNew);
      return noticiaClone;
    }
  } // getters
};
