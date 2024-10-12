<template>
  <page-title p-title="New Cpu" />
  <new-cpu-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewCpuForm from "components/cpus/NewCpuForm.vue";

export default {
  components: {NewCpuForm, PageTitle}

}
</script>
