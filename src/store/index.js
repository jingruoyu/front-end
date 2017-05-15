import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import count from './modules/count.js'
import todos from './modules/todos.js'

Vue.use(Vuex)

const vuexStore = {
	getters,
	actions,
	modules: {
		count,
		todos
	}
}

const store = new Vuex.Store(vuexStore)

export default store