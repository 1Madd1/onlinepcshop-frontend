<template>
  <page-title p-title="Coolers" />
  <coolers-list />
  <new-entity-button p-label="Add Cooler" :p-method-to-invoke="openNewCoolerPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import CoolersList from "components/coolers/CoolersList.vue";

export default {

  components: {NewEntityButton, PageTitle, CoolersList},
  methods: {
    openNewCoolerPage() {
      this.$router.push("/new-cooler");
    }
  }
}
</script>
