<template>
  <div>
    <SkeletonTable v-if="loading" />

    <q-table
      :columns="columns_inner"
      :data="data"
      :loading="loading"
      v-if="!loading && selection != null"
      flat
      :selection="selection"
      :selected.sync="selected"
      bordered
    />

    <q-table
      :columns="columns_inner"
      :data="data"
      :loading="loading"
      v-if="!loading && selection == null"
      flat
      bordered
    >
      <!-- Body -->
      <template v-slot:body="data">
        <q-tr :props="data">
          <q-td
            v-for="(item, index) in columns_fields"
            :key="index"
            :class="item.align"
          >
            <span v-if="item.status == true">
              <StatusBadge :status="data.row[item.field]" />
            </span>
            <span v-else>
              {{ data.row[item.field] }}
            </span>
          </q-td>

          <!-- Botões de Ação -->
          <q-td class="text-center" v-if="actions_inner.length > 0">
            <span v-for="(action, index) in actions_inner" :key="index">
              <!-- Botão Desabilitado -->
              <span
                v-if="
                  action.fieldToEnable ? !data.row[action.fieldToEnable] : false
                "
              >
                <ButtonAction
                  :icon="action.icon"
                  :permission="action.permission"
                  :disabled="
                    action.fieldToEnable
                      ? !data.row[action.fieldToEnable]
                      : false
                  "
                  :tooltip="action.tooltip"
                />
              </span>

              <!-- Botões Habilitados -->
              <span v-else>
                <ButtonAction
                  v-if="action.to && action.visible == true"
                  :icon="action.icon"
                  :to="action.to | routeField(data.row[action.fieldToRoute])"
                  :permission="action.permission"
                  :disabled="
                    action.fieldToEnable
                      ? !data.row[action.fieldToEnable]
                      : false
                  "
                  :tooltip="action.tooltip"
                />

                <ButtonAction
                  v-if="
                    !action.to &&
                      action.deleteAPI != undefined &&
                      action.visible == true
                  "
                  @click="
                    confirmar_delete(data.row[action.fieldToRoute], action)
                  "
                  :icon="action.icon"
                  :permission="action.permission"
                  :loading="deleting"
                  :disabled="
                    action.fieldToEnable
                      ? !data.row[action.fieldToEnable]
                      : false
                  "
                  :tooltip="action.tooltip"
                />

                <ButtonAction
                  v-if="
                    !action.to &&
                      action.emit != undefined &&
                      action.visible == true
                  "
                  @click="sendEmit(action, data.row)"
                  :icon="action.icon"
                  :permission="action.permission"
                  :disabled="
                    action.fieldToEnable
                      ? !data.row[action.fieldToEnable]
                      : false
                  "
                  :tooltip="action.tooltip"
                />
              </span>
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <ConfirmarDelete
      :show="showDialogDelete"
      @close="showDialogDelete = false"
      @deletar="deletar"
    >
      {{ msgDelete }}
    </ConfirmarDelete>

    <Erro :show="showDialogErro" @close="showDialogErro = false">
      {{ msgErro }}
    </Erro>

    <Info :show="showDialogInfo" @close="showDialogInfo = false">
      {{ msgInfo }}
    </Info>

    <Sucesso :show="showDialogSucesso" @close="showDialogSucesso = false">
      {{ msgSucesso }}
    </Sucesso>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters, dispatch } from "vuex";
import SkeletonTable from "components/Skeleton/Table";

export default {
  name: "ComponentTable",
  props: {
    columns: Array,
    data: Array,
    data_field: Array,
    actions: Array,
    selection: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: { SkeletonTable },
  data() {
    return {
      columns_inner: [],
      columns_fields: [],
      data_inner: [],
      actions_inner: [],

      id_ToDelete: null,
      deleting: false,
      routeToDelete: "",

      showDialogDelete: false,
      showDialogErro: false,
      showDialogInfo: false,
      showDialogSucesso: false,
      msgDelete: "Deseja deletar este registro?",
      msgErro: "",
      msgInfo: "",
      msgSucesso: "",

      selected: []
    };
  },
  mounted() {
    this.ajustarColunas();
    this.ajustarActions();
  },
  computed: {
    ...mapGetters("Login", { token: "getToken" })
  },
  watch: {
    columns() {
      this.ajustarColunas();
    },
    actions() {
      this.ajustarActions();
    },
    selected: {
      handler() {
        this.$emit("selected", this.selected);
      },
      deep: true
    }
  },
  filters: {
    align(alignment) {
      return `text-${alignment}`;
    },
    routeField(to, field) {
      return to.replace("{field}", field);
    }
  },
  methods: {
    ...mapActions("Login", ["changeToken"]),

    ajustarColunas() {
      // Ajustar Cabeçalhos
      //----------------------
      this.columns_inner = this.columns.map(item => {
        return {
          label: item.label,
          name: item.field ? item.field : null,
          align: item.align ? item.align : "center",
          field: item.field ? item.field : null,
          status: item.status ? item.status : false,
          sortable: item.sort
            ? item.sort
            : item.sort == undefined
            ? true
            : false
        };
      });

      // Ajustar Fields
      //------------------
      this.columns_fields = [];
      this.columns_inner.forEach(item => {
        if (item.field) {
          this.columns_fields.push({
            field: item.field ? item.field : null,
            align: item.align ? item.align : "center",
            status: item.status ? item.status : false
          });
        }
      });
    },

    // Ajustar Dados
    //-----------------
    ajustarDados() {
      this.columns_fields = [];
      this.columns_inner.forEach(item => {
        if (item.field) {
          this.columns_fields.push({
            field: item.field ? item.field : null,
            align: item.align ? item.align : "center"
          });
        }
      });
    },

    // Ajustar Actions
    //---------------------
    ajustarActions() {
      if (
        this.actions == null ||
        this.actions == undefined ||
        this.actions.length == 0
      ) {
        return;
      }

      this.actions_inner = this.actions.map(item => {
        return {
          ...item,
          icon: item.icon,
          to: item.to != undefined ? item.to : null,
          permission: item.permission != undefined ? item.permission : false,
          visible: item.visible != undefined ? item.visible : true,
          fieldToEnable:
            item.fieldToEnable != undefined ? item.fieldToEnable : false,
          tooltip: item.tooltip
        };
      });
    },

    confirmar_delete(id, action) {
      this.showDialogDelete = true;
      this.id_ToDelete = id;
      this.msgDelete = action.msgDelete
        ? action.msgDelete
        : "Deseja deletar este registro?";
      this.routeToDelete = action.deleteAPI ? action.deleteAPI : "";
    },

    async deletar() {
      this.deleting = true;
      let routeAPI = this.routeToDelete.replace("{field}", this.id_ToDelete);

      try {
        const config = { headers: { Authorization: `Bearer ${this.token}` } };
        const response = await this.$axios.delete(routeAPI, config);
        this.msgSucesso = response.data.message;
        this.showDialogSucesso = true;
        this.emitReload();
      } catch (error) {
        this.msgErro = "Falha ao deletar a LNT.";
        this.showDialogErro = true;
        this.changeToken(null);
      }
      this.deleting = false;
    },

    emitReload() {
      this.$emit("reload", true);
    },

    sendEmit(action, regitro) {
      this.$emit(action.emit, regitro);
    }
  }
};
</script>

<style lang="scss">
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>
