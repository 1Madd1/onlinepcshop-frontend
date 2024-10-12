<template>
  <page-title p-title="Cpu's" />
  <cpus-list />
  <new-entity-button p-label="Add Cpu" :p-method-to-invoke="openNewCpuPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import CpusList from "components/cpus/CpusList.vue";

export default {

  components: {NewEntityButton, PageTitle, CpusList},
  methods: {
    openNewCpuPage() {
      this.$router.push("/new-cpu");
    }
  }
}
</script>
