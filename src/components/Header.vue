<template>
	<div class="relative bg-white">
		<div class="mx-auto max-w-7xl px-6">
			<div
				class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
			>
				<div>
					<img
						class="h-8 w-auto sm:h-10"
						src="https://img.icons8.com/ios-filled/512/salt-bae.png"
						alt=""
					/>
				</div>

				<div class="flex items-center justify-center">
					<button
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
					>
						<router-link to="/"> Список птиц</router-link>
					</button>
				</div>

				<div class="flex items-center justify-center">
					<button
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
					>
						<router-link to="/allrecipes"> Список рецептов</router-link>
					</button>
				</div>

				<template v-if="birdsUrl === thisUrl">
					<select
						v-model="whatSortIs"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
					>
						<option value="desc" class="flex items-center justify-center">
							Сортировка за алфавитом А-Я
						</option>
						<option value="asc" class="flex items-center justify-center">
							Сортировка за алфавитом Я-А
						</option>
					</select>

					<div
						class="flex items-center justify-center bg-green-600 px-4 py-2 rounded-md border border-transparent hover:bg-green-700 cursor-pointer"
					>
						<div class="flex items-center">
							<input
								id="default-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
								v-model="isChacked"
							/>
							<label
								for="default-checkbox"
								class="ml-2 text-sm font-medium text-white shadow-sm cursor-pointer"
								>Птицы с рецептами</label
							>
						</div>
					</div>
				</template>

				<div class="items-center justify-end flex md:flex-1 lg:w-0">
					<button
						v-if="birdsUrl === thisUrl"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
					>
						<router-link to="/createBird"> Создать птицу</router-link>
					</button>
					<button
						v-if="auth"
						class="h-[42px] w-[42px] ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
					>
						<router-link
							to="/authorize"
							@click="changeAuth"
							class="h-auto w-auto"
							><img src="https://img.icons8.com/clouds/512/name.png" alt="" />
						</router-link>
					</button>
					<button
						v-else
						class="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
					>
						<router-link to="/authorize">Войти</router-link>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/Auth'
import { mapActions, mapState } from 'pinia'

export default {
	name: 'HeaderForm',
	props: {},
	data() {
		return {
			thisUrl: this.$route.fullPath,
			birdsUrl: '/',
			isChacked: false,
			whatSortIs: 'desc'
		}
	},
	computed: {
		...mapState(useAuthStore, ['auth'])
	},
	methods: {
		...mapActions(useAuthStore, ['changeIsAuth']),

		changeAuth() {
			this.changeIsAuth(false)
		},

		sortByStart() {
			this.$emit('emitSortByStart')
		},

		sortByEnd() {
			this.$emit('emitSortByEnd')
		}
	},
	watch: {
		whatSortIs() {
			this.whatSortIs === 'desc' ? this.sortByStart() : this.sortByEnd()
		},
		isChacked() {
			this.$emit('emitIsCheck', this.isChacked)
		}
	},
	emits: ['emitIsCheck', 'emitSortByStart', 'emitSortByEnd']
}
</script>
