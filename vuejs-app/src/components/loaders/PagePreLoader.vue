<template>
  <div class="page-pre-loader text-center">
    <img class="-beestock-loader" src="../../assets/images/beestock-loader.gif" alt="Page Pre Loader">
  </div>
</template>

<script>
  export default {
    name: 'page-pre-loader'
  }
</script>

<style lang="scss" scoped>
  .page-pre-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;

    .-beestock-loader {
      max-width: 200px;
      max-height: 200px;
    }
  }
</style>
