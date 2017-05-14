<template>
    <div class="hello">
        <h1>{{getMsg}}</h1>
        <h1>{{count}}</h1>
        <h1>{{doneTodosCount}}</h1>
        <button @click="increment({num:10})">addCount</button>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default {
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            localCount: 1
        }
    },
    computed: {
        getMsg () {
            return this.msg;
        },
        ...mapState({
            //箭头函数,state直接是store中的state
            count: state => state.count,
            //与根实例的store挂钩，直接获取this.$store.state.count
            countAlias: 'count',
            //使用局部状态需要常规写法
            countPlusLocalState (state) {
                return state.count + this.localCount
            }
        }),
        ...mapGetters([
            'doneTodosCount'
        ])
    }, 
    methods: {
        ...mapMutations([
            'increment'
        ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
