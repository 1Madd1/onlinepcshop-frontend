<template>
  <new-motherboard-form
    :p-edit-mode="true"
    :p-motherboard="pMotherboard"
  />
</template>
<script>
import NewMotherboardForm from "components/motherboards/NewMotherboardForm.vue";

export default {
  components: {NewMotherboardForm},
  props: {
    pMotherboard: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          socketType: null,
          memoryType: null,
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
