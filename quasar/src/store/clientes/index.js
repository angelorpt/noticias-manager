import Vue from 'vue'

export default {
  namespaced: true,

  state: () => {
    return {
      lstClientes : [],
      cliente  : {},
      loading  : false,
      saving   : false,
      updating : false,
      deleting : false,
    }
  },

  mutations: {
    setLstClientes(state, lista) {
      state.lstClientes = lista;
    },
    setCliente(state, objeto) {
      state.cliente = objeto;
    },
    setLoading(state, value) {
      state.loading = value
    },
    setSaving(state, value) {
      state.saving = value
    },
    setUpdating(state, value) {
      state.updating = value
    },
    setDeleting(state, value) {
      state.deleting = value
    },    
  },

  actions: {

    async loadClientes({ commit }) {
      commit('setLoading', true);
      commit('setSaving', false);
      try {
        const response = await Vue.prototype.$axios.get('/clientes');
        commit('setLstClientes', response.data);
      } catch (error) {
        commit('setLstClientes', []);
        console.log('erro', error);
      }
      commit('setLoading', false);
    },  

    async loadCliente({ commit }, cliente_id) {
      commit('setSaving', false);
      commit('setLoading', true);
      try {
        const response = await Vue.prototype.$axios.get(`/clientes/${cliente_id}`);
        commit('setCliente', response.data);
      } catch (error) {
        commit('setCliente', {});
        console.log('erro', error);
      }
      commit('setLoading', false);
    },  

    async salvarCliente({ commit }, cliente) {
      commit('setSaving', true);
      console.log('cliente', cliente);
      try {
        const data = { 
          ...cliente,
          nascimento : Vue.prototype.$moment(cliente.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          sexo       : cliente.sexo.value,
        }
        const response = await Vue.prototype.$axios.post('/clientes', data);
        commit('setSaving', false);
        return { status: true, response }
      } catch (error) {
        commit('setSaving', false);
        console.log(error);
        return { status: false, error }
      }
    },  

    async atualizarCliente({ commit }, cliente) {
      commit('setSaving', true);
      try {
        const data = { 
          ...cliente,
          nascimento : Vue.prototype.$moment(cliente.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          sexo       : cliente.sexo.value,
        }
        const response = await Vue.prototype.$axios.put(`/clientes/${cliente.id}`, data);
        commit('setSaving', false);
        return { status: true, response }
      } catch (error) {
        console.log(error);
        commit('setSaving', false);
        return { status: false, error }
      }
    },  

    async deletarCliente({ commit }, cliente) {
      commit('setUpdating', true);
      try {
        const response = await Vue.prototype.$axios.delete(`/clientes/${cliente.id}`);
      } catch (error) {
        console.log(error);
      }
      commit('setUpdating', false);
    },  

  }, // actions

  getters: {
    
    listaClienteToTable(state) {
      let lstClone  = [...state.lstClientes];
      let lstSorted = lstClone.sort((a, b) => a.nome > b.nome ? 1 : (a.none < b.nome ? -1 : 0))
      let lista     = lstSorted.map(item => {
        return {
          ...item,
          nascimento : Vue.prototype.$moment(item.nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          idade      : Vue.prototype.$moment().diff(item.nascimento, 'years', false),
          sexo       : item.sexo == 'M' ? 'Masculino' : 'Feminino',
        }
      })

      return lista;
    },    

    getCliente({ cliente }) {
      let sexoTemp = {
        label : cliente.sexo == 'M' ? 'Masculino' : 'Feminino',
        value : cliente.sexo
      }
      let clienteNew   = {
        ...cliente,
        nascimento : Vue.prototype.$moment(cliente.nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
        sexo: sexoTemp
      }
      let clienteClone = Vue.prototype.$_.cloneDeep(clienteNew)

      return clienteClone;
    },    


  } // getters
}