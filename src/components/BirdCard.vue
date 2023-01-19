<template lang="">
  <div>
    
  </div>
</template>

<script>
export default {
  name: "CardForm",
  props: {
    card: Object,
    id: Number
  },
  data() {
    return{
      birdData: []
    }
  },
  methods: {
    deleteBirdData(index) {
      if (confirm("Вы точно хотите удалить?")) {
        this.birdData.splice(index, 1)
      }

      localStorage.setItem("details", JSON.stringify(this.birdData))
    },

    getData() {
      let DataDet = localStorage.getItem("details")

      if (DataDet) {
        this.birdData = JSON.parse(DataDet)
      } else {
        localStorage.setItem("details", JSON.stringify(this.birdData))
      }
    },

    mounted() {
      this.getData()
    }
  }
}
</script>