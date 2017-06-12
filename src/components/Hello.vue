<template>
    <div class="hello">
        <h1>{{getMsg}}</h1>
        <p>count: {{count}}</p>
        <p>countSquare: {{countSquare}}</p>
        <button @click="increment(3)">addCount</button>
        <button @click="reset">reset</button>
        <router-view class="bar"></router-view>
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
            msg: 'Hello',
            localCount: 1
        }
    },
    computed: {
        getMsg () {
            return this.msg;
        },
        /*countSquare () {
            return this.$store.getters['countModule/countSquare'];
        },*/
        ...mapState({
            //箭头函数,state直接是store中的state
            count: function (state) {
                return state.countModule.count;
            },
            //与根实例的store挂钩，直接获取this.$store.state.count
            //countAlias: 'count',
            //使用局部状态需要常规写法
            countPlusLocalState (state) {
                return state.countModule.count + this.localCount
            }
        }),
        ...mapGetters({
            doneTodosCount: 'todosModule/doneTodosCount',
            countSquare: 'countModule/countSquare'
        })
        
    }, 
    methods: {
        /*...mapMutations([
            'countModule.increment',
            'countModule.reset'
        ])*/
        increment (num) {
            this.$store.commit('countModule/increment',num);
        },
        reset () {
            this.$store.commit('countModule/reset');
        }
    }
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
.hello {
    padding: 10px;
    border:1px solid;
}
.bar {
    margin: 10px;
}
</style>
