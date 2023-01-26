<template>
	<div>
		<header-page />
		<div class="mx-auto max-w-7xl p-6">
			<div>
				<Multiselect
					v-model="value"
					mode="tags"
					:close-on-select="false"
					:searchable="true"
					:create-option="true"
					:options="options"
					placeholder="Pick some"
				/>
			</div>

			<div class="flex flex-wrap justify-evenly flex-row" v-if="value">
				<div
					class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
					v-for="(recipe, index) in recipesBySearching"
					:key="index"
				>
					<recipe-card
						:recipeId="recipe.id"
						:key="index"
						:recipesArr="recipe"
						:isSearchRecipe="searching"
					/>
				</div>
			</div>

			<div class="flex flex-wrap justify-evenly flex-row" v-else>
				<div
					class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
					v-for="(recipe, index) in randomRecipes"
					:key="index"
				>
					<recipe-card
						:recipeId="recipe.id"
						:key="index"
						:recipesArr="recipe"
						:isSearchRecipe="searching"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import HeaderPage from '@/components/Header'
import RecipeCard from '@/components/RecipeCard'
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '@/stores/Recipes'

export default {
	components: { Multiselect, HeaderPage, RecipeCard },
	data() {
		return {
			value: null,
			options: [
				'tomato',
				'cheese',
				'chicken meat',
				'cucumber',
				'bay leaf',
				'apple',
				'pork',
				'potatoes',
				'rice'
			],
			searching: true
		}
	},
	computed: {
		...mapState(useRecipesStore, ['randomRecipes']),
		...mapState(useRecipesStore, ['recipesBySearching'])
	},
	methods: {
		...mapActions(useRecipesStore, ['getRandomRecipes']),
		...mapActions(useRecipesStore, ['getRecipesBySearching']),

		getRecipe() {
			this.getRecipesBySearching({ includeIngredients: this.value.join(',') })
		}
	},
	mounted() {
		this.getRandomRecipes()
	},
	watch: {
		value() {
			if (this.value === null || this.value.length === 0)
				this.getRandomRecipes()
			else this.getRecipe()
		}
	}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
