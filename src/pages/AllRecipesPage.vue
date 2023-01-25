<template>
	<div>
		<header-page />
		<div class="mx-auto max-w-7xl p-6">
			<div class="flex flex-wrap flex-row">
				<Multiselect
					class="w-88%"
					v-model="value"
					mode="tags"
					:close-on-select="false"
					:searchable="true"
					:create-option="true"
					:options="options"
				/>
			</div>

			<div class="flex flex-wrap justify-evenly flex-row" v-if="value">
				<div
					class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
					v-for="(recipe, index) in recipeData"
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
import axios from '@/utils/axios.js'
import RecipeCard from '@/components/RecipeCard'

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
			recipeData: [],
			randomRecipes: [],
			searching: true
		}
	},
	methods: {
		getRecipe() {
			this.getRecipes({ includeIngredients: this.value.join(',') })
		},

		getRandomRecipes() {
			axios
				.get('/recipes/random', {
					params: {
						number: '100'
					}
				})
				.then((response) => {
					this.randomRecipes = response.data.recipes
				})
		},

		getRecipes(params) {
			axios
				.get('/recipes/complexSearch', {
					params: {
						number: '5',
						...params
					}
				})
				.then((response) => {
					this.recipeData = response.data.results
				})
		}
	},
	mounted() {
		this.getRandomRecipes()
	},
	watch: {
		value() {
			console.log(this.value.length)
			if (this.value === null || this.value.length === 0)
				this.getRandomRecipes()
			else this.getRecipe()
		}
	}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
