<template>
  <page-title p-title="Normal Computers" />
  <computers-cards p-type="normal" />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import ComputersCards from "components/computers/ComputersCards.vue";

export default {

  components: {ComputersCards, PageTitle},
}
</script>
