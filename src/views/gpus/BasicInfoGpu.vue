<template>
  <new-gpu-form
    :p-edit-mode="true"
    :p-gpu="pGpu"
  />
</template>
<script>
import NewGpuForm from "components/gpus/NewGpuForm.vue";

export default {
  components: {NewGpuForm},
  props: {
    pGpu: {
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
          pcieType: null,
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
