<template>
	<div>
		<header-page />
		<div class="mx-auto max-w-7xl p-6">
			<div>
				<img
					class="rounded-t-lg h-[25%] w-[40%] mx-auto mb-3"
					:src="recipeData.image"
					alt=""
				/>
			</div>
			<div class="text-3xl text-center mb-3">{{ recipeData.title }}</div>
			<div class="text-3xl mb-3 indent-8">Instructions:</div>
			<div v-for="(step, index) in steps" :key="index">
				<div class="indent-4" v-html="step.step"></div>
			</div>
		</div>
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
			recipeData: [],
			steps: []
		}
	},
	methods: {
		getRecipeData() {
			axios
				.get(`/recipes/${this.$route.params.recipeId}/information`)
				.then((response) => {
					this.recipeData = response.data
					this.steps = this.recipeData.analyzedInstructions[0].steps
				})
		}
	},
	mounted() {
		this.getRecipeData()
	}
}
</script>
