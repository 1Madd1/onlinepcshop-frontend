<template>
  <new-computer-form
    :p-edit-mode="true"
    :p-computer="pComputer"
  />
</template>
<script>
import NewComputerForm from "components/computers/NewComputerForm.vue";

export default {
  components: {NewComputerForm},
  props: {
    pComputer: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          computerName: null,
          price: null,
          dateOfCreation: null,
          currency: "RSD",
          computerType: null,
          tdp: null,
          description: null,
          image: null,
          saleType: null,
          computerCaseId: null,
          gpuId: null,
          cpuId: null,
          coolerId: null,
          motherboardId: null,
          powerSupplyId: null,
        }
      }
    }
  },
  created() {
  }
}
</script>
