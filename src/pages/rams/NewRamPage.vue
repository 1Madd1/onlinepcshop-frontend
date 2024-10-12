<template>
  <page-title p-title="New Ram" />
  <new-ram-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewRamForm from "components/rams/NewRamForm.vue";

export default {
  components: {NewRamForm, PageTitle}

}
</script>
