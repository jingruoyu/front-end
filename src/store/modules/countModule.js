const state = {
	count: 0
}
const mutations = {
	increment (state,payload) {
		state.count = state.count + payload;
	},
	reset (state) {
		state.count = 0;
	}
}
const getters = {
	countSquare (state) {
		return state.count*state.count;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}