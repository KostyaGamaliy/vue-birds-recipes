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
				<bird-card-form :birdCard="birdCard" :birdId="index" :key="index">
					<template v-slot:delete-bird-button="slotPrps">
						<button
							class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
							@click="handleBirdDelete(slotPrps.id)"
						>
							Удалить
						</button>
					</template>
				</bird-card-form>
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
				<bird-card-form :birdCard="birdCard" :birdId="index" :key="index">
					<template v-slot:delete-bird-button="slotPrps">
						<button
							class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
							@click="handleBirdDelete(slotPrps.id)"
						>
							Удалить
						</button>
					</template>
				</bird-card-form>
			</div>
		</div>
	</div>
</template>

<script>
import BirdCardForm from '@/components/BirdCard.vue'
import HeaderForm from '@/components/Header.vue'
import { useAuthStore } from '@/stores/Auth'
import { mapState } from 'pinia'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/utils/localStorageUtil'

export default {
	name: 'BirdsPage',
	components: {
		BirdCardForm,
		HeaderForm
	},
	computed: {
		...mapState(useAuthStore, ['auth'])
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
			saveDataToLocalStorage('details', this.birdsCards)
		},

		sortByEnd() {
			this.birdsCards.sort(this.byFieldEnd('birdName'))
			this.isCheckedBirdsCards.sort(this.byFieldEnd('birdName'))
			saveDataToLocalStorage('details', this.birdsCards)
		},

		byFieldStart(field) {
			return (a, b) => (a[field] > b[field] ? 1 : -1)
		},

		byFieldEnd(field) {
			return (a, b) => (a[field] > b[field] ? -1 : 1)
		},

		handleBirdDelete(index) {
			if (this.auth) {
				if (confirm('Вы точно хотите удалить?')) {
					this.birdsCards.splice(index, 1)
					saveDataToLocalStorage('details', this.birdsCards)
				}
			} else this.$router.push('/authorize')
		},

		changeIsChacked(params) {
			this.isChecked = params
			this.isCheckedBirdsCards = []

			this.birdsCards.forEach((e) => {
				if (e.recipesArr.length !== 0) this.isCheckedBirdsCards.push(e)
			})
		}
	},
	mounted() {
		this.birdsCards = getDataFromLocalStorage('details')
	}
}
</script>
