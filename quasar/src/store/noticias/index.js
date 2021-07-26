import Vue from "vue";

export default {
  namespaced: true,

  state: () => {
    return {
      lstNoticias: [],
      noticia: {},
      loading: false,
      saving: false,
      updating: false,
      deleting: false
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
    },
    setSaving(state, value) {
      state.saving = value;
    },
    setUpdating(state, value) {
      state.updating = value;
    },
    setDeleting(state, value) {
      state.deleting = value;
    }
  },

  actions: {
    async loadNoticias({ commit }) {
      commit("setLoading", true);
      commit("setSaving", false);
      try {
        const response = await Vue.prototype.$axios.get("/noticias/elastic");
        commit("setLstNoticias", response.data.hits.hits);
      } catch (error) {
        commit("setLstNoticias", []);
      }
      commit("setLoading", false);
    },

    async loadNoticia({ commit }, noticiaId) {
      commit("setSaving", false);
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

    getCliente({ cliente }) {
      let sexoTemp = {
        label: cliente.sexo == "M" ? "Masculino" : "Feminino",
        value: cliente.sexo
      };
      let clienteNew = {
        ...cliente,
        nascimento: Vue.prototype
          .$moment(cliente.nascimento, "YYYY-MM-DD")
          .format("DD/MM/YYYY"),
        sexo: sexoTemp
      };
      let clienteClone = Vue.prototype.$_.cloneDeep(clienteNew);

      return clienteClone;
    }
  } // getters
};
