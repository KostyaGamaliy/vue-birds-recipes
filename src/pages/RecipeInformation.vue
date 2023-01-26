<template>
	<div>
		<header-page />
		<div class="mx-auto max-w-7xl p-6">
			<div>
				<img
					class="rounded-t-lg h-[25%] w-[40%] mx-auto mb-3"
					:src="recipeInfo.image"
					alt=""
				/>
			</div>
			<div class="text-3xl text-center mb-3">{{ recipeInfo.title }}</div>
			<div class="text-3xl mb-3 indent-8">Instructions:</div>
			<div v-for="(step, index) in getSteps" :key="index">
				<div class="indent-4" v-html="step.step"></div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderPage from '@/components/Header'
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '@/stores/Recipes'

export default {
	name: 'RecipeInformation',
	components: {
		HeaderPage
	},
	computed: {
		...mapState(useRecipesStore, ['recipeInfo']),

		getSteps() {
			return this.recipeInfo.analyzedInstructions
				? this.recipeInfo.analyzedInstructions[0].steps
				: []
		}
	},
	methods: {
		...mapActions(useRecipesStore, [`getRecipeInformation`])
	},
	mounted() {
		this.getRecipeInformation(this.$route.params.recipeId)
	}
}
</script>
