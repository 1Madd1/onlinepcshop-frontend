<template>
  <page-title p-title="Case Fans" />
  <case-fans-list />
  <new-entity-button p-label="Add Case Fan" :p-method-to-invoke="openNewCaseFanPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import CaseFansList from "components/case-fans/CaseFansList.vue";

export default {

  components: {NewEntityButton, PageTitle, CaseFansList},
  methods: {
    openNewCaseFanPage() {
      this.$router.push("/new-case-fan");
    }
  }
}
</script>
