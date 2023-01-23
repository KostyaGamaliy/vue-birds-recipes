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
import axios from '@/utils/axios.js'
import HeaderForm from '@/components/Header.vue'

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
	methods: {
		addBird() {
			let regURL =
				/^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i

			if (this.birdName.length < 3) {
				alert('Имя должно быть от 3 символов')
			} else if (this.birdDescription.length < 10) {
				alert('Описание должно быть от 10 символов')
			} else
				this.getRecipes(
					{ tags: this.birdName.replace(' ', ',').toLowerCase() },
					regURL
				)
		},

		getData() {
			let DataDet = localStorage.getItem('details')

			if (DataDet) {
				this.birdData = JSON.parse(DataDet)
			} else {
				localStorage.setItem('details', JSON.stringify(this.birdData))
			}
		},

		getRecipes(params, regURL) {
			let newBirdData = {
				imageUrl: regURL.test(this.imageUrl)
					? this.imageUrl
					: 'https://img.icons8.com/ios/512/full-body-crow.png',
				birdName: this.birdName,
				birdDescription: this.birdDescription,
				recipesArr: []
			}

			axios
				.get('/recipes/random', {
					params: {
						number: '20',
						...params
					}
				})
				.then((response) => {
					newBirdData.recipesArr = response.data.recipes

					this.birdData.push(newBirdData)
					localStorage.setItem('details', JSON.stringify(this.birdData))

					this.imageUrl = ''
					this.birdName = ''
					this.birdDescription = ''
				})
		}
	},
	mounted() {
		this.getData()
	}
}
</script>
