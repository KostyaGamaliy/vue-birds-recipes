<template>
	<div>
		<img
			class="rounded-t-lg h-[223px] w-[335px]"
			:src="birdCard.imageUrl"
			alt=""
		/>
		<h5
			class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden truncate"
		>
			{{ birdCard.birdName }}
		</h5>

		<div class="mb-3 font-normal text-gray-700 overflow-y-auto h-32">
			{{ birdCard.birdDescription }}
		</div>

		<router-link
			:to="{ name: 'RecipesPage', params: { birdId } }"
			class="inline-flex items-center px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
		>
			Список рецептов
			<svg
				aria-hidden="true"
				class="w-4 h-4 ml-2 -mr-1"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				></path>
			</svg>
		</router-link>

		<div class="flex flex-row justify-between mt-3">
			<router-link
				:to="{ name: 'AddRecipePage', params: { birdId } }"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
			>
				Добавить рецепт
			</router-link>

			<router-link
				:to="{ name: 'ChangeBirdPage', params: { birdId } }"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
			>
				Изменить
			</router-link>

			<button
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
				@click="deleteBirdData(birdId)"
			>
				Удалить
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BirdCardForm',
	props: {
		birdCard: Object,
		birdId: Number
	},
	data() {
		return {}
	},
	methods: {
		deleteBirdData(index) {
			if (this.$store.state.isAuth) {
				if (confirm('Вы точно хотите удалить?')) {
					this.$emit('emitDeleteBird', index)
				}
			} else this.$router.push('/authorize')
		}
	},
	emits: ['emitDeleteBird']
}
</script>
