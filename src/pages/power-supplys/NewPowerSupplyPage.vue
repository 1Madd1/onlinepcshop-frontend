<template>
  <page-title p-title="New Power Supply" />
  <new-power-supply-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewPowerSupplyForm from "components/power-supplys/NewPowerSupplyForm.vue";

export default {
  components: {NewPowerSupplyForm, PageTitle}

}
</script>
