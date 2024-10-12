<template>
  <page-title p-title="New Gpu" />
  <new-gpu-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewGpuForm from "components/gpus/NewGpuForm.vue";

export default {
  components: {NewGpuForm, PageTitle}

}
</script>
