<template>
	<div>
		<header-form />
		<div class="flex flex-column justify-between mx-auto max-w-7xl px-6">
			<form class="w-1/3 mx-auto py-10">
				<div>
					<label class="text-xl text-black opacity-70">
						Сслка на картинку:
						<input
							type="text"
							class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none"
							v-model="imageUrl"
						/>
					</label>

					<label class="text-xl text-black opacity-70">
						Именование птицы:
						<input
							type="text"
							placeholder="Заголовок"
							class="mt-1 mb-3 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none"
							v-model="birdName"
						/>
					</label>

					<label class="text-xl text-black opacity-70">
						Описание:
						<textarea
							placeholder="Опис..."
							class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40"
							v-model="birdDescription"
						></textarea>
					</label>

					<div class="flex gap-8 items-center justify-center mt-4">
						<div
							class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
							@click="addBird"
						>
							Создать птицу
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import HeaderForm from '@/components/Header.vue'
import { getDataFromLocalStorage } from '@/utils/localStorageUtil'
import { mapActions, mapState } from 'pinia'
import { useRecipesStore } from '@/stores/Recipes'

export default {
	name: 'CreateBird',
	components: {
		HeaderForm
	},
	data() {
		return {
			imageUrl: '',
			birdName: '',
			birdDescription: '',
			birdData: []
		}
	},
	computed: {
		...mapState(useRecipesStore, ['birdRecipes'])
	},
	methods: {
		...mapActions(useRecipesStore, ['getRecipesForBird']),

		addBird() {
			if (this.birdName.length < 3) {
				alert('Имя должно быть от 3 символов')
			} else if (this.birdDescription.length < 10) {
				alert('Описание должно быть от 10 символов')
			} else {
				this.getRecipesForBird(
					{
						tags: this.birdName.replace(' ', ',').toLowerCase()
					},
					this.birdData,
					this.imageUrl,
					this.birdName,
					this.birdDescription
				)

				this.imageUrl = ''
				this.birdName = ''
				this.birdDescription = ''
			}
		}
	},
	mounted() {
		this.birdData = getDataFromLocalStorage('details')
	}
}
</script>
