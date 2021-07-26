<template>
  <q-page padding>
    <Container>

      <Titulo titulo="Cliente" subtitulo="Visualizar Dados do Cliente" />

      <LabelGroup label="Dados" />
      <Row>
        <Input label="Nome" v-model="cliente.nome" class="col-8" disabled />
        <Input label="CPF"  v-model="cliente.cpf"  class="col-2" disabled mask="###.###.###-##"/>
        <Input label="RG"   v-model="cliente.rg"   class="col-2" disabled />
      </Row>

      <Row>
        <Input v-model="cliente.email"      label="E-mail"     disabled class="col-4" />
        <Input v-model="cliente.fone1"      label="Fone 1"     disabled class="col-2" mask="(##) #####-####" />
        <Input v-model="cliente.fone2"      label="Fone 2"     disabled class="col-2" mask="(##) #####-####" />
        <Input v-model="cliente.nascimento" label="Nascimento" disabled class="col-2" />
        <Input v-model="cliente.sexo.label" label="Sexo"       disabled class="col-2" />
      </Row>

      <LabelGroup label="Endereço" />
      <Row>
        <Input label="CEP"    v-model="cliente.cep"    class="col-2" disabled mask="##.###-###" />
        <Input label="Rua"    v-model="cliente.rua"    class="col-5" disabled />
        <Input label="Número" v-model="cliente.numero" class="col-2" disabled />
        <Input label="Bairro" v-model="cliente.bairro" class="col-3" disabled />
      </Row>

      <Row>
        <Input label="Complemento" v-model="cliente.complemento" disabled class="col-5" />
        <Input label="Cidade"      v-model="cliente.cidade"      disabled class="col-5" />
        <Input label="UF"          v-model="cliente.uf"          disabled class="col-2" />
      </Row>

      <ButtonBack />

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
        cpf         : null ,
        rg          : null ,
        email       : null ,
        fone1       : null ,
        fone2       : null ,
        nascimento  : null ,
        sexo        : null ,
        cep         : null ,
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
 
  },
}
</script>
