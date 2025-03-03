<template>
  <new-power-supply-form
    :p-edit-mode="true"
    :p-power-supply="pPowerSupply"
  />
</template>
<script>
import NewPowerSupplyForm from "components/power-supplys/NewPowerSupplyForm.vue";

export default {
  components: {NewPowerSupplyForm},
  props: {
    pPowerSupply: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          dateOfCreation: null,
          currency: "RSD",
          wattage: null,
          color: null,
          efficiencyRating: null,
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
