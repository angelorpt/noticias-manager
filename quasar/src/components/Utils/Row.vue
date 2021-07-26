<template>
  <div class="row k-row q-mb-sm">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ComponentRow',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .k-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>