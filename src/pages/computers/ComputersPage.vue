<template>
  <page-title p-title="Computer's" />
  <computers-list />
  <new-entity-button p-label="Add Computer" :p-method-to-invoke="openNewComputerPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import ComputersList from "components/computers/ComputersList.vue";

export default {

  components: {NewEntityButton, PageTitle, ComputersList},
  methods: {
    openNewComputerPage() {
      this.$router.push("/new-computer");
    }
  }
}
</script>
