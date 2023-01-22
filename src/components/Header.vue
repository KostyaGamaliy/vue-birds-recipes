<template>
	<div class="relative bg-white">
		<div class="mx-auto max-w-7xl px-6">
			<div
				class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
			>
				<div class="flex justify-start lg:w-0 lg:flex-1">
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
						<router-link to="/birds"> Список птиц</router-link>
					</button>
				</div>

				<template v-if="birdsUrl === thisUrl">
					<div class="flex items-center justify-center">
						<button
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
						>
							Сортировка за алфавитом А-Я
						</button>
					</div>

					<div class="flex items-center justify-center">
						<button
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
						>
							Сортировка за алфавитом Я-А
						</button>
					</div>

					<div class="flex items-center justify-center">
						<div class="flex items-center">
							<input
								id="default-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
							/>
							<label
								for="default-checkbox"
								class="ml-2 text-sm font-medium text-gray-900"
								>Птицы с рецептами</label
							>
						</div>
					</div>
				</template>

				<div class="items-center justify-end flex md:flex-1 lg:w-0">
					<button
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
					>
						<router-link to="/createBird"> Создать птицу</router-link>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderForm',
	props: {},
	data() {
		return {
			thisUrl: this.$route.fullPath,
			birdsUrl: '/birds'
		}
	}
}
</script>
