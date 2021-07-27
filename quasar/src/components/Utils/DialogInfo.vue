<template>
  <div>

    <!-- Dialog Info -->
    <q-dialog v-model="internal_show">
      <q-card style="width:60%">

        <!-- Título -->
        <q-card-section class="bg-blue-10 text-white">
          <div class="text-h6">
            <q-avatar icon="info" text-color="white" />Info
          </div>
        </q-card-section>

        <!-- Conteúdo -->
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <slot></slot>
          </span>
        </q-card-section>

        <!-- Botões de Ação -->
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
  export default {
    name: 'DialogInfo',
    props: ['show'],
    data() {
      return {
        internal_show: false
      }
    },
    watch: {
      show() {
        this.internal_show = this.show;        
      },
      internal_show() {
        if (!this.internal_show) {
          this.$emit('close', false)
        }        
      }
    },
  }

</script>
