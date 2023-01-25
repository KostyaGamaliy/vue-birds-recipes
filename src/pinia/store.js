import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			isAuth: false
		}
	}
})

export default store
