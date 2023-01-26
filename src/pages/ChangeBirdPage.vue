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
							v-model="birdData.imageUrl"
						/>
					</label>

					<label class="text-xl text-black opacity-70">
						Именование птицы:
						<input
							type="text"
							placeholder="Заголовок"
							class="mt-1 mb-3 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none"
							v-model="birdData.birdName"
						/>
					</label>

					<label class="text-xl text-black opacity-70">
						Описание:
						<textarea
							class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40"
							v-model="birdData.birdDescription"
						></textarea>
					</label>

					<div class="flex gap-8 items-center justify-center mt-4">
						<div
							class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
							@click="updateBird"
						>
							Изменить
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import HeaderForm from '@/components/Header.vue'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/utils/localStorageUtil'

export default {
	name: 'ChangeBirdPage',
	components: {
		HeaderForm
	},
	data() {
		return {
			birdData: [],
			allBirds: []
		}
	},
	methods: {
		updateBird() {
			if (this.birdData.birdName.length < 3) {
				alert('Имя должно быть от 3 символов')
			} else if (this.birdData.birdDescription.length < 10) {
				alert('Описание должно быть от 10 символов')
			} else {
				let regURL =
					/^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=~/-]*)?(?:#[^ '"&<>]*)?$/i

				regURL.test(this.birdData.imageUrl)
					? this.birdData.imageUrl
					: 'https://img.icons8.com/ios/512/full-body-crow.png'

				this.allBirds[this.$route.params.birdId] = this.birdData

				saveDataToLocalStorage('details', this.allBirds)

				this.$router.go(-1)
			}
		}
	},
	mounted() {
		this.allBirds = getDataFromLocalStorage('details')
		this.birdData = this.allBirds[this.$route.params.birdId]
	}
}
</script>
