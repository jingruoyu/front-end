<template>
    <div class="hello">
        <h1>{{message}}</h1>
        <h1>{{count}}</h1>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'hello',
    data () {
        return {
            message:'bar',
        }
    },
    computed: mapState({
    	count:'count',
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
