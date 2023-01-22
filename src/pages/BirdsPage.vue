<template>
	<div>
		<header-form />
		<div class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row">
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
			birdsCards: []
		}
	},
	methods: {
		handleBirdDelete(index) {
			this.birdsCards.splice(index, 1)
			localStorage.setItem('details', JSON.stringify(this.birdsCards))
		},

		getData() {
			let DataDet = localStorage.getItem('details')

			if (DataDet) {
				this.birdsCards = JSON.parse(DataDet)
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
