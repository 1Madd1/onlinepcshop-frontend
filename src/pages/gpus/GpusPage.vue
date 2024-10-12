<template>
  <page-title p-title="Gpu's" />
  <gpus-list />
  <new-entity-button p-label="Add Gpu" :p-method-to-invoke="openNewGpuPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import GpusList from "components/gpus/GpusList.vue";

export default {

  components: {NewEntityButton, PageTitle, GpusList},
  methods: {
    openNewGpuPage() {
      this.$router.push("/new-gpu");
    }
  }
}
</script>
