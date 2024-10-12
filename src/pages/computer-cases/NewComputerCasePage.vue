<template>
  <page-title p-title="New Computer Case" />
  <new-computer-case-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewComputerCaseForm from "components/computer-cases/NewComputerCaseForm.vue";

export default {
  components: {NewComputerCaseForm, PageTitle}

}
</script>
