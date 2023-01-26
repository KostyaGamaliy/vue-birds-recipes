<template>
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="w-full max-w-xs">
			<form class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						v-model="name"
					/>
				</div>

				<label class="block text-gray-700 text-sm font-bold mb-2">
					Password
				</label>
				<div class="relative mb-6">
					<input
						class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						:type="showPassword ? 'text' : 'password'"
						v-model="password"
					/>
					<div
						class="absolute right-0 top-0 p-1 cursor-pointer h-[42px] w-[42px]"
					>
						<img :src="eyeIcon" alt="eye" @click="togglePasswordVisibility" />
					</div>
				</div>

				<div class="flex items-center justify-between">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
						@click="isAuth"
					>
						Sign In
					</button>
					<router-link
						:to="{ name: 'BirdsPage' }"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					>
						Вернутся на главную
					</router-link>
				</div>
			</form>
			<p class="text-center text-gray-500 text-xs">&copy;Palmo-mater 2023.</p>
		</div>
	</div>
</template>

<script>
import Users from '@/data/Users'
import { useAuthStore } from '@/stores/Auth'
import { mapActions } from 'pinia'

export default {
	name: 'AuthorizationPage',
	data() {
		return {
			name: '',
			password: '',
			showPassword: false
		}
	},
	computed: {
		eyeIcon() {
			return this.showPassword
				? 'https://img.icons8.com/material-outlined/512/visible.png'
				: 'https://img.icons8.com/dotty/512/closed-eye.png'
		}
	},
	methods: {
		...mapActions(useAuthStore, ['changeIsAuth']),

		isAuth() {
			const user = Users.find((user) => user.userName === this.name)

			if (user && user.userPassword === this.password) {
				this.changeIsAuth(true)
				alert('Успешный вход')
				this.$router.push('/')
			} else {
				alert('Не верно указаны данные')
			}
		},

		togglePasswordVisibility() {
			this.showPassword = !this.showPassword
		}
	}
}
</script>
