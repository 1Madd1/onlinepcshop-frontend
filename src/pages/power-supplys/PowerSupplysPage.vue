<template>
  <page-title p-title="Power Supplies" />
  <power-supplys-list />
  <new-entity-button p-label="Add Power Supply" :p-method-to-invoke="openNewPowerSupplyPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import PowerSupplysList from "components/power-supplys/PowerSupplysList.vue";

export default {

  components: {NewEntityButton, PageTitle, PowerSupplysList},
  methods: {
    openNewPowerSupplyPage() {
      this.$router.push("/new-power-supply");
    }
  }
}
</script>
