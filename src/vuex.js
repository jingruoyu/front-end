export default {
	state: {
		count: 0,
		todos: [
	        { id: 1, text: '...', done: true },
	        { id: 2, text: '...', done: false }
	    ]
	},
	mutations: {
		increment (state,payload) {
			state.count += payload.num;
		}
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done);
		},
		doneTodosCount: (state,getters) => {
			return getters.doneTodos.length;
		}
	}
}