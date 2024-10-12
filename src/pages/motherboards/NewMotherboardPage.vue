<template>
  <page-title p-title="New Motherboard" />
  <new-motherboard-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewMotherboardForm from "components/motherboards/NewMotherboardForm.vue";

export default {
  components: {NewMotherboardForm, PageTitle}

}
</script>
