<template>
	<div>
		<img
			class="rounded-t-lg h-[223px] w-[335px]"
			:src="recipesArr.image"
			alt=""
		/>
		<h5
			class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
		>
			{{ recipesArr.title }}
		</h5>

		<template v-if="!isSearchRecipe">
			<div
				class="mb-3 font-normal text-gray-700 overflow-y-auto h-32"
				v-html="recipesArr.instructions"
			></div>

			<div class="flex flex-row justify-between mt-3">
				<router-link
					:to="{ name: 'ChangeRecipePage', params: { recipeId } }"
					class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
				>
					Изменить
				</router-link>

				<button
					class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
					@click="deleteRecipeData(recipeId)"
				>
					Удалить
				</button>
			</div>
		</template>

		<div class="flex flex-row justify-between mt-3" v-else>
			<router-link
				:to="{ name: 'RecipeInformation', params: { recipeId } }"
				class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
			>
				Посмотреть способ приготовления
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardForm',
	props: {
		recipeId: Number,
		recipesArr: Object,
		isSearchRecipe: Boolean
	},
	methods: {
		deleteRecipeData(index) {
			if (this.$store.state.isAuth) {
				if (confirm('Вы точно хотите удалить?')) {
					this.$emit('emitDeleteRecipe', index)
				}
			} else this.$router.push('/authorize')
		}
	}
}
</script>
