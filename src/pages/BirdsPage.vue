<template>
  <div>
    <div class="mx-auto max-w-7xl p-6 flex flex-wrap justify-evenly flex-row">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md my-3"
        v-for="(card, index) in cards" :key="index">
        <card-form :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
import CardForm from "@/components/Card.vue"

export default {
  name: "CardForm",
  components: {
    CardForm
  },
  data() {
    return {
      cards: []
    }
  },
  methods: {
    loadData() {
      let dataDet = JSON.parse(localStorage.getItem("details")) 
      
        this.cards = dataDet
      
    }
  },
  created() {
    this.loadData()
  }
}
</script>