const state = {
	count: 0
}
const mutations = {
	increment (state,payload) {
		state.count += payload.num;
	}
}

export default {
	state,
	mutations
}