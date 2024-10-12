<template>
  <page-title p-title="Computer Cases" />
  <computer-cases-list />
  <new-entity-button p-label="Add Computer Case" :p-method-to-invoke="openNewComputerCasePage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import ComputerCasesList from "components/computer-cases/ComputerCasesList.vue";

export default {

  components: {NewEntityButton, PageTitle, ComputerCasesList},
  methods: {
    openNewComputerCasePage() {
      this.$router.push("/new-computer-case");
    }
  }
}
</script>
