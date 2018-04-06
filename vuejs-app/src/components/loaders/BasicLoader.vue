<template>
  <div class="basic-loader text-center">
    <img class="-beestock-loader" src="../../assets/images/beestock-loader.gif" alt="Basic Loader">
  </div>
</template>

<script>
  export default {
    name: 'basic-loader'
  }
</script>

<style lang="scss" scoped>
  .basic-loader {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    .-beestock-loader {
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      max-width: 150px;
      max-height: 150px;
    }
  }
</style>
