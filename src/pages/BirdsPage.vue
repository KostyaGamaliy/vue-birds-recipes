<template>
	<div>
		<header-form
			@emitIsCheck="changeIsChacked"
			@emitSortByStart="sortByStart"
			@emitSortByEnd="sortByEnd"
		/>
		<div
			class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row"
			v-if="isChecked && isCheckedBirdsCards.length > 0"
		>
			<div
				class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
				v-for="(birdCard, index) in isCheckedBirdsCards"
				:key="index"
			>
				<bird-card-form
					:birdCard="birdCard"
					:birdId="index"
					:key="index"
					@emitDeleteBird="handleBirdDelete"
				/>
			</div>
		</div>
		<div
			class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row"
			v-else-if="isChecked && isCheckedBirdsCards.length === 0"
		></div>
		<div
			class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row"
			v-else
		>
			<div
				class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
				v-for="(birdCard, index) in birdsCards"
				:key="index"
			>
				<bird-card-form
					:birdCard="birdCard"
					:birdId="index"
					:key="index"
					@emitDeleteBird="handleBirdDelete"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import BirdCardForm from '@/components/BirdCard.vue'
import HeaderForm from '@/components/Header.vue'

export default {
	name: 'BirdsPage',
	components: {
		BirdCardForm,
		HeaderForm
	},
	data() {
		return {
			birdsCards: [],
			isCheckedBirdsCards: [],
			isChecked: false,
			isBirdRecipes: false
		}
	},
	methods: {
		sortByStart() {
			this.birdsCards.sort(this.byFieldStart('birdName'))
			this.isCheckedBirdsCards.sort(this.byFieldStart('birdName'))
			localStorage.setItem('details', JSON.stringify(this.birdsCards))
		},

		sortByEnd() {
			this.birdsCards.sort(this.byFieldEnd('birdName'))
			this.isCheckedBirdsCards.sort(this.byFieldEnd('birdName'))
			localStorage.setItem('details', JSON.stringify(this.birdsCards))
		},

		byFieldStart(field) {
			return (a, b) => (a[field] > b[field] ? 1 : -1)
		},

		byFieldEnd(field) {
			return (a, b) => (a[field] > b[field] ? -1 : 1)
		},

		handleBirdDelete(index) {
			this.birdsCards.splice(index, 1)
			localStorage.setItem('details', JSON.stringify(this.birdsCards))
		},

		changeIsChacked(params) {
			this.isChecked = params
			this.isCheckedBirdsCards = []

			this.birdsCards.forEach((e) => {
				if (e.recipesArr.length !== 0) this.isCheckedBirdsCards.push(e)
			})
		},

		getData() {
			let dataDet = localStorage.getItem('details')

			if (dataDet) {
				this.birdsCards = JSON.parse(dataDet)
			} else {
				localStorage.setItem('details', JSON.stringify(this.birdsCards))
			}
		}
	},
	mounted() {
		this.getData()
	}
}
</script>
