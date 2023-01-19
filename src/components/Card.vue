<template lang="">
  <div>
    <img class="rounded-t-lg h-[223px] w-[335px]" :src="card.imageUrl" alt="" />
        <h5
          class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden">
          {{ card.birdName }}
        </h5>
    
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto h-32">
          {{ card.birdDescription }}
        </p>
    
        <router-link to="/recipes"
          class="inline-flex items-center px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
            Список рецептов
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </router-link>
    
        <div class="flex flex-row justify-between mt-3">
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-rose-400">
            Добавить рецепт
          </button>
    
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400">
            Изменить
          </button>
    
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400">
            Удалить
          </button>
        </div>
  </div>
</template>

<script>
export default {
  name: "CardForm",
  props: {
    card: Object
  },
}
</script>