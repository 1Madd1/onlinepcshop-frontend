<template>
  <new-cpu-form
    :p-edit-mode="true"
    :p-cpu="pCpu"
  />
</template>
<script>
import NewCpuForm from "components/cpus/NewCpuForm.vue";

export default {
  components: {NewCpuForm},
  props: {
    pCpu: {
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
          socketType: null,
          coreCount: null,
          performanceCoreClock: null,
          performanceCoreBoostClock: null,
          tdp: null,
          manufacturer: null,
          description: null,
          image: null,
          includesCooler: false,
          includesIntegratedGpu: false
        }
      }
    }
  }
}
</script>
