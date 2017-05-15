const state = {
	todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: true },
        { id: 3, text: '...', done: false }
    ]
}
const getters = {
	doneTodos: state => {
		return state.todos.filter(todo => todo.done);
	},
	doneTodosCount: (state,getters) => {
		return getters.doneTodos.length;
	}
}

export default {
	state,
	getters
}