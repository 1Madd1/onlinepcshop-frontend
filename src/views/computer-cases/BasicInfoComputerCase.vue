<template>
  <new-computer-case-form
    :p-edit-mode="true"
    :p-computer-case="pComputerCase"
  />
</template>
<script>
import NewComputerCaseForm from "components/computer-cases/NewComputerCaseForm.vue";

export default {
  components: {NewComputerCaseForm},
  props: {
    pComputerCase: {
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
          caseType: null,
          color: null,
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
