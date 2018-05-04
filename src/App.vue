<template>
  <div id="app">
    <router-view class="root"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    background: url(./assets/background.jpg) no-repeat;
    background-size: 100%;
}

</style>
