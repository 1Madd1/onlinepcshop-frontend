<template>
  <page-title p-title="New Cooler" />
  <new-cooler-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewCoolerForm from "components/coolers/NewCoolerForm.vue";

export default {
  components: {NewCoolerForm, PageTitle}

}
</script>
