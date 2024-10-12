<template>
  <new-cooler-form
    :p-edit-mode="true"
    :p-cooler="pCooler"
  />
</template>
<script>
import NewCoolerForm from "components/coolers/NewCoolerForm.vue";

export default {
  components: {NewCoolerForm},
  props: {
    pCooler: {
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
          tdp: null,
          waterCooled: false,
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
