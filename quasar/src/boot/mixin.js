import Vue from 'vue'

import SkeletonTable    from 'components/Skeleton/Table'

import Pesquisar        from 'components/Utils/Pesquisar'
import PesquisarNew     from 'components/Utils/PesquisarNew'
import Table            from 'components/Utils/Table'
import Container        from 'components/Utils/Container'
import Row              from 'components/Utils/Row'
import ButtonAction     from 'components/Utils/ButtonAction'
import ButtonBack       from 'components/Utils/ButtonBack'
import StatusBadge      from 'components/Utils/StatusBadge'
import InputDate        from 'components/Utils/InputDate'
import Input            from 'components/Utils/Input'
import Select           from 'components/Utils/Select'
import Titulo           from 'components/Utils/Titulo'
import LabelGroup       from 'components/Utils/LabelGroup'

import SaveCancel       from 'components/Utils/ButtonsSaveCancel'

import ConfirmarDelete  from 'components/Utils/DialogDelete'
import Sucesso          from 'components/Utils/DialogSucesso'
import Erro             from 'components/Utils/DialogErro'
import Info             from 'components/Utils/DialogInfo'


Vue.mixin({
  components: {
    Container,
    Row,
    ButtonAction,
    ButtonBack,
    Table,
    Pesquisar,
    PesquisarNew,
    SkeletonTable,
    StatusBadge,
    InputDate,
    Input,
    Select,
    Titulo,
    ConfirmarDelete,
    LabelGroup,

    SaveCancel,

    Sucesso,
    Info,
    Erro,
  },
  data() {
    return { }
  },
  methods: {

    notificar(msg, color, position = 'bottom-left') {
      this.$q.notify({
        message  : msg,
        color    : color,
        position : position
      })
    },

    filterArray(array, arrayKeys, value, distinct) {

      let result = [];

      array.forEach(item => {

        arrayKeys.forEach(key => {
          switch (typeof item[key]) {
            case 'string':
              if (item[key].toLowerCase().search(value.toLowerCase()) >= 0) {
                result.push(item);
              }
              break;
            case 'number':
              if (item[key] == value) {
                result.push(item);
              }
              break;
            case 'boolean':
              if (item[key] == value) {
                result.push(item);
              }
              break;
          }
        });
      });

      result = this.$_.uniqBy(result, distinct); // Validando colaborador único por Matricula
      return result;
    },    
  }
})
