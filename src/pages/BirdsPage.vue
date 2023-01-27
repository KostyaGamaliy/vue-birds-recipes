<template>
	<div>
		<header-form
			@emitIsCheck="changeIsChacked"
			@emitSortByStart="sortByStart"
			@emitSortByEnd="sortByEnd"
		/>

		<form class="mx-auto max-w-5xl mt-2">
			<div class="relative">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="search"
					id="default-search"
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
					v-model="searchTerm"
					placeholder="Search..."
					required
				/>
			</div>
		</form>

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
			isBirdRecipes: false,
			searchTerm: ''
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
					this.birdsCards = getDataFromLocalStorage('details')
					this.birdsCards.splice(index, 1)
					this.searchTerm = ''

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
	},
	watch: {
		searchTerm(newValue) {
			let newSortBirdsCards = []

			this.birdsCards = getDataFromLocalStorage('details')

			newSortBirdsCards = this.birdsCards.filter((elem) => {
				if (elem.birdName.includes(newValue)) {
					return true
				}
			})

			this.birdsCards = newSortBirdsCards
		}
	}
}
</script>
