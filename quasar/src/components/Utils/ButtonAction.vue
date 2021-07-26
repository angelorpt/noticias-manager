<template>
  <span>
    <!-- To -->
    <span v-if="to != null">
      <!-- Com permissão -->
      <q-btn  flat
              scratch 
              v-if="permission"
              align="center"
              class="center"
              :color="color"
              :icon="icon"
              :loading="loading"
              :to="to" >
          <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
      </q-btn>              

      <!-- Sem permissão --> 
      <q-btn  flat
              scratch 
              v-if="!permission"
              align="center"
              class="center"
              :color="color"
              :icon="icon"
              disabled >
          <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
      </q-btn>
    </span>            

    <!-- Click Button -->
    <span v-if="to == null">
      <!-- Com permissão -->
      <q-btn  flat
              scratch 
              v-if="permission"
              align="center"
              class="center"
              :color="color"
              :icon="icon"
              :loading="loading"
              @click="clickButton" >
        <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
      </q-btn>

      <!-- Sem permissão -->
      <q-btn  flat
              scratch 
              v-if="!permission"
              align="center"
              class="center"
              :color="color"
              :icon="icon"
              disable >
        <q-tooltip v-if="tooltip != null">{{tooltip}}</q-tooltip>
      </q-btn>
    </span>      
  </span>          
</template>

<script>
export default {
  name: 'ComponentButtonAction',
  props: {
    icon: {
      type    : String,
      default : 'edit'
    },
    to: {
      type    : String,
      default : null,
    },
    color: {
      type    : String,
      default : 'primary'
    },
    permission: {
      type     : Boolean,
      default  : true
    },
    tooltip: {
      type    : String,
      default : null,
    },
    loading: {
      type    : Boolean,
      default : false,
    }
  },
  data () {
    return {}
  },
  methods: {
    clickButton() {
      this.$emit('click');
    }
  }
}
</script>
