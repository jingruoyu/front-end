import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import countModule from './modules/countModule.js'
import todosModule from './modules/todosModule.js'

Vue.use(Vuex)

const vuexStore = {
	getters,
	actions,
	modules: {
		countModule,
		todosModule
	},
	strict: true
}

const store = new Vuex.Store(vuexStore)

export default store