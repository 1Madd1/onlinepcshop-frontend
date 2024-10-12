<template>
  <page-title p-title="Storages" />
  <storages-list />
  <new-entity-button p-label="Add Storage" :p-method-to-invoke="openNewStoragePage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import StoragesList from "components/storages/StoragesList.vue";

export default {

  components: {NewEntityButton, PageTitle, StoragesList},
  methods: {
    openNewStoragePage() {
      this.$router.push("/new-storage");
    }
  }
}
</script>
