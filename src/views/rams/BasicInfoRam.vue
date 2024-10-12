<template>
  <new-ram-form
    :p-edit-mode="true"
    :p-ram="pRam"
  />
</template>
<script>
import NewRamForm from "components/rams/NewRamForm.vue";

export default {
  components: {NewRamForm},
  props: {
    pRam: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          memoryType: null,
          ramSpeed: null,
          ramStorage: null,
          tdp: null,
          manufacturer: null,
          description: null,
          image: null,
          saleType: null,
        }
      }
    }
  }
}
</script>
