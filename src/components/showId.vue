<template>
  <div class="hello">
    <h1>{{$route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
