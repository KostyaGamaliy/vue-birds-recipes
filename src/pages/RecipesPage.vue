<template>
	<div>
		<header-form />
		<div class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row">
			<div
				class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
				v-for="(recipe, index) in recipesCards.recipesArr"
				:key="index"
			>
				<recipe-card
					:recipeId="index"
					:key="index"
					:recipesArr="recipe"
					@emitDeleteRecipe="handleRecipeDelete"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard'
import HeaderForm from '@/components/Header.vue'

export default {
	name: 'RecipesPage',
	components: {
		RecipeCard,
		HeaderForm
	},
	data() {
		return {
			recipesCards: [],
			birdData: []
		}
	},
	methods: {
		handleRecipeDelete(index) {
			this.birdData[this.$route.params.birdId].recipesArr.splice(index, 1)
			localStorage.setItem('details', JSON.stringify(this.birdData))

			this.getData()
		},

		getData() {
			let dataDet = localStorage.getItem('details')

			if (dataDet) {
				this.recipesCards = JSON.parse(dataDet)[this.$route.params.birdId]
				this.birdData = JSON.parse(dataDet)
			} else {
				localStorage.setItem('details', JSON.stringify(this.recipesCards))
			}
		}
	},
	mounted() {
		this.getData()
	}
}
</script>
