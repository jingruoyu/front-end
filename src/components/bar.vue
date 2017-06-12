<template>
    <div class="hello">
        <h1>{{message}}</h1>
        <p>count: {{count}}</p>
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
    	count:state => state.countModule.count,
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
    text-align: left;
}
p {
    text-align: center;
}
</style>
