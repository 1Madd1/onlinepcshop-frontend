<template>
  <page-title p-title="New Case Fan" />
  <new-case-fan-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewCaseFanForm from "components/case-fans/NewCaseFanForm.vue";

export default {
  components: {NewCaseFanForm, PageTitle}

}
</script>
