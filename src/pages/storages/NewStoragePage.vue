<template>
  <page-title p-title="New Storage" />
  <new-storage-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewStorageForm from "components/storages/NewStorageForm.vue";

export default {
  components: {NewStorageForm, PageTitle}

}
</script>
