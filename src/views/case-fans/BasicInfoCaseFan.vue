<template>
  <new-case-fan-form
    :p-edit-mode="true"
    :p-case-fan="pCaseFan"
  />
</template>
<script>
import NewCaseFanForm from "components/case-fans/NewCaseFanForm.vue";

export default {
  components: {NewCaseFanForm},
  props: {
    pCaseFan: {
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
          fanSize: null,
          color: null,
          rpm: null,
          noiseLevel: null,
          tdp: null,
          manufacturer: null,
          description: null,
          image: null,
        }
      }
    }
  }
}
</script>
