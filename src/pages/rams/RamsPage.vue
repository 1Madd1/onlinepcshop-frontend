<template>
  <page-title p-title="Ram's" />
  <rams-list />
  <new-entity-button p-label="Add Ram" :p-method-to-invoke="openNewRamPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import RamsList from "components/rams/RamsList.vue";

export default {

  components: {NewEntityButton, PageTitle, RamsList},
  methods: {
    openNewRamPage() {
      this.$router.push("/new-ram");
    }
  }
}
</script>
