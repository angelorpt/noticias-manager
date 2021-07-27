<template>
  <div>
    <Row class="q-mt-lg">
      <span class="k-label-group">{{label}}</span>
    </Row>
    <Row v-if="sublabel != undefined">
      <span class="k-sublabel-group">{{sublabel}}</span>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'ComponentLabelGroup',
  props:['label', 'sublabel'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .k-label-group {
    font-weight : 450;
    font-size   : 16px;
    color       : grey;
  }
  .k-sublabel-group {
    font-weight : 400;
    font-size   : 13px;
    color       : grey;
  }
</style>