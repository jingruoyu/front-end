<template>
    <div class="hello">
        <h1 class="welcome">welcome to here</h1>
    </div>
</template>

<script>

export default {
    name: 'hello',
    data () {
        return {
        }
    },
    computed: {
    }, 
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
    }

    .welcome {
        font-size: 50px;
    }
</style>
