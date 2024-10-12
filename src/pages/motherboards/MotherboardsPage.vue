<template>
  <page-title p-title="Motherboard's" />
  <motherboards-list />
  <new-entity-button p-label="Add Motherboard" :p-method-to-invoke="openNewMotherboardPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import MotherboardsList from "components/motherboards/MotherboardsList.vue";

export default {

  components: {NewEntityButton, PageTitle, MotherboardsList},
  methods: {
    openNewMotherboardPage() {
      this.$router.push("/new-motherboard");
    }
  }
}
</script>
