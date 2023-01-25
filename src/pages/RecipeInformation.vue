<template>
	<div>
		<header-page />
		<div class="mx-auto max-w-7xl p-6" v-html="recipeData.instructions"></div>
	</div>
</template>

<script>
import HeaderPage from '@/components/Header'
import axios from '@/utils/axios'

export default {
	name: 'RecipeInformation',
	components: {
		HeaderPage
	},
	data() {
		return {
			recipeData: []
		}
	},
	methods: {
		getRecipeData() {
			axios
				.get(`/recipes/${this.$route.params.recipeId}/information`)
				.then((response) => {
					this.recipeData = response.data
					console.log(this.recipeData)
				})
		}
	},
	mounted() {
		this.getRecipeData()
	}
}
</script>
