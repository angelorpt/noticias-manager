<template>
  <div :class="css_size">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ComponentContainer',
  props: {
    size: {
      type    : String,
      default : "80"
    }
  },
  data () {
    return {
      css_size  : 'k-container-80',
      css_sizes : {
        80: 'k-container-80',
        85: 'k-container-85',
        90: 'k-container-90',
        95: 'k-container-95',
      }
    }
  },
  mounted() {
    this.css_size = this.css_sizes[parseInt(this.size)]
  },
  watch: {
    size() {
      this.css_size = this.css_sizes[parseInt(this.size)]
    }
  },
}
</script>


<style lang="scss">
  .k-container-80 {
    margin: auto 10%;
    margin-top: 3rem;
  }

  .k-container-85 {
    margin: auto 7.5%;
    margin-top: 3rem;
  }  

  .k-container-90 {
    margin: auto 5%;
    margin-top: 3rem;
  }

  .k-container-95 {
    margin: auto 2.5%;
    margin-top: 3rem;
  }
</style>