<template>
  <q-page padding>
    <Container>

      <Titulo titulo="Cliente" subtitulo="Gerenciar Dados do Cliente" />

      <LabelGroup label="Dados" />
      <Row>
        <Input label="Nome" v-model="cliente.nome" class="col-8" :rules="[val => !!val || 'Obrigatório']" />
        <Input label="CPF"  v-model="cliente.cpf"  class="col-2"  mask="###.###.###-##" :rules="[val => !!val || 'Obrigatório']" />
        <Input label="RG"   v-model="cliente.rg"   class="col-2" />
      </Row>

      <Row>
        <Input     v-model="cliente.email"      label="E-mail"     class="col-4" :rules="[val => !!val || 'Obrigatório']" />
        <Input     v-model="cliente.fone1"      label="Fone 1"     class="col-2" mask="(##) #####-####" />
        <Input     v-model="cliente.fone2"      label="Fone 2"     class="col-2" mask="(##) #####-####" />
        <InputDate v-model="cliente.nascimento" label="Nascimento" class="col-2" />
        <Select    v-model="cliente.sexo"       label="Sexo"       class="col-2" :options="optSexo" />
      </Row>

      <LabelGroup label="Endereço" />
      <Row>
        <Input label="CEP"    v-model="cliente.cep"    class="col-2" mask="##.###-###" @blur="getCep" :rules="[val => !!val || 'Obrigatório']" />
        <Input label="Rua"    v-model="cliente.rua"    class="col-5" />
        <Input label="Número" v-model="cliente.numero" class="col-2" />
        <Input label="Bairro" v-model="cliente.bairro" class="col-3" />
      </Row>

      <Row>
        <Input label="Complemento" v-model="cliente.complemento" class="col-5" />
        <Input label="Cidade"      v-model="cliente.cidade"      class="col-5" />
        <Input label="UF"          v-model="cliente.uf"          class="col-2" />
      </Row>

      <SaveCancel labelSave="Salvar"
                  toCancel="/clientes"
                  :permissao="true"
                  :loading="saving"
                  @saveClick="salvar" />

    </Container>
  </q-page>
</template>

<script>

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name  : 'PageClienteNovo',
  props : ['cliente_id'],
  data() {
    return {
      
      optSexo: [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino' , value: 'F' },
      ],

      cliente: {
        nome        : '' ,
        cpf         : '' ,
        rg          : null ,
        email       : '' ,
        fone1       : null ,
        fone2       : null ,
        nascimento  : '' ,
        sexo        : null ,
        cep         : '' ,
        rua         : null ,
        numero      : null ,
        complemento : null ,
        bairro      : null ,
        cidade      : null ,
        uf          : null ,
      }        

    }
  },
  mounted() {
    if (this.cliente_id) {
      this.loadCliente(this.cliente_id)
    }    
  },
  watch: {
    cliente_id() {
      console.log('this.cliente_id', this.cliente_id);
      if (this.cliente_id) {
        this.loadCliente(this.cliente_id)
      }
    },
    getCliente() {
      this.cliente = {...this.getCliente}
    }
  },
  computed: {
    ...mapState  ('Cliente', ['saving']),
    
    ...mapGetters('Cliente', ['getCliente']),
  },
  methods: {
    
    ...mapActions('Cliente', ['loadCliente', 'salvarCliente', 'atualizarCliente']),

    validaDados() {
      
      let field = null;
      field = this.cliente.nome
      if ((field == null) || (field == undefined) || (field.trim().length == 0)) {
        this.notificar('Informe o Nome do Cliente', 'yellow-10')
        return false;
      }

      field = this.cliente.cpf
      if ((field == null) || (field == undefined) || (field.trim().length == 0)) {
        this.notificar('Informe o CPF', 'yellow-10')
        return false;
      }
      
      field = this.cliente.email
      if ((field == null) || (field == undefined) || (field.trim().length == 0)) {
        this.notificar('Informe o E-mail', 'yellow-10')
        return false;
      }

      field = this.cliente.cep
      if ((field == null) || (field == undefined) || (field.trim().length == 0)) {
        this.notificar('Informe o CEP', 'yellow-10')
        return false;
      }

      field = this.cliente.nascimento
      if (!this.$moment(field, "DD/MM/YYYY").isValid()) { 
        this.notificar('Data de Nascimento Inválida', 'yellow-10')
        return false;
      }

      return true;

    },

    async salvar() {

      if (!this.validaDados()) return;

      if (this.cliente_id) {
        let result = await this.atualizarCliente(this.cliente);
        if (result.status) {
          this.notificar(result.response.data.message, 'green', 'center');
        } else {
          this.notificar('Falha ao Atualizar o Cliente', 'red', 'center');
        }
      } else {
        let result = await this.salvarCliente(this.cliente);
        if (result.status) {
          this.notificar(result.response.data.message, 'green', 'center');
        } else {
          this.notificar('Falha ao Salvar o Cliente', 'red', 'center');
        }
      }

      // Volta para a tela inicial
      this.$router.go(-1);
    },

    async getCep(value) {
      value = value.replace(/\D/g, "");
      try {
        let result   = await this.$axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${value}/json/`);
        let dadosCep = result.data
        this.cliente = {
          ...this.cliente,
          rua         : dadosCep.logradouro,
          complemento : dadosCep.complemento,
          bairro      : dadosCep.bairro,
          cidade      : dadosCep.localidade,
          uf          : dadosCep.uf,
        }
      } catch (error) {
        this.notificar('CEP Inválido', 'red', 'center');
      }
    }
  },
}
</script>
