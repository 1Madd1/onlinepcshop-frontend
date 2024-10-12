<template>
  <page-title p-title="New Computer" />
  <new-computer-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewComputerForm from "components/computers/NewComputerForm.vue";

export default {
  components: {NewComputerForm, PageTitle}

}
</script>
