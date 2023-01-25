<template>
	<div className="flex flex-col items-center justify-center h-screen">
		<div className="w-full max-w-xs">
			<form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						v-model="name"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						v-model="password"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
						@click="isAuth"
					>
						Sign In
					</button>
					<router-link
						to="/"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					>
						Вернутся на главную
					</router-link>
				</div>
			</form>
			<p className="text-center text-gray-500 text-xs">
				&copy;Palmo-mater 2023.
			</p>
		</div>
	</div>
</template>

<script>
import Users from '@/data/Users'

export default {
	name: 'AuthorizationPage',
	data() {
		return {
			name: '',
			password: ''
		}
	},
	methods: {
		isAuth() {
			const user = Users.find((user) => user.userName === this.name)

			if (user && user.userPassword === this.password) {
				this.$store.state.isAuth = true
				alert('Успешный вход')
				this.$router.push('/')
			} else {
				alert('Не верно указаны данные')
			}
		}
	}
}
</script>
