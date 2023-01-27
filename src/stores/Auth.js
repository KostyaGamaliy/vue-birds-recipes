import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuth: false
	}),
	getters: {
		auth: (state) => state.isAuth
	},
	actions: {
		changeIsAuth(bool) {
			this.isAuth = bool
		}
	},
	persist: true
})
