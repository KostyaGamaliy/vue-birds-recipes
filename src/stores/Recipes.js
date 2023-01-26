import { defineStore } from 'pinia'
import instanceAxios from '@/utils/axios'
import { saveDataToLocalStorage } from '@/utils/localStorageUtil'

export const useRecipesStore = defineStore('recipes', {
	state: () => ({
		recipesState: {},
		recipesBySearchingState: {},
		randomRecipesState: {},
		birdRecipesState: {}
	}),
	getters: {
		recipeInfo: (state) => state.recipesState,
		randomRecipes: (state) => state.randomRecipesState,
		recipesBySearching: (state) => state.recipesBySearchingState,
		birdRecipes: (state) => state.birdRecipesState
	},
	actions: {
		getRecipeInformation(recipeId) {
			instanceAxios.get(`/recipes/${recipeId}/information`).then((response) => {
				this.recipesState = response.data
			})
		},

		getRandomRecipes() {
			instanceAxios
				.get('/recipes/random', {
					params: {
						number: '100'
					}
				})
				.then((response) => {
					this.randomRecipesState = response.data.recipes
				})
		},

		getRecipesBySearching(params) {
			instanceAxios
				.get('/recipes/complexSearch', {
					params: {
						number: '10',
						...params
					}
				})
				.then((response) => {
					this.recipesBySearchingState = response.data.results
				})
		},

		getRecipesForBird(params, data, image, name, desc) {
			let regURL =
				/^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i

			let newBirdData = {
				imageUrl: regURL.test(this.imageUrl)
					? image
					: 'https://img.icons8.com/ios/512/full-body-crow.png',
				birdName: name,
				birdDescription: desc,
				recipesArr: []
			}

			instanceAxios
				.get('/recipes/random', {
					params: {
						number: '20',
						...params
					}
				})
				.then((response) => {
					this.birdRecipesState = response.data.recipes

					newBirdData.recipesArr = response.data.recipes

					data.push(newBirdData)

					saveDataToLocalStorage('details', data)
				})
		}
	}
})
