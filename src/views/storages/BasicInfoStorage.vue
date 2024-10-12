<template>
  <new-storage-form
    :p-edit-mode="true"
    :p-storage="pStorage"
  />
</template>
<script>
import NewStorageForm from "components/storages/NewStorageForm.vue";

export default {
  components: {NewStorageForm},
  props: {
    pStorage: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          componentName: null,
          quantity: null,
          price: null,
          currency: "RSD",
          storageType: null,
          capacity: null,
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
