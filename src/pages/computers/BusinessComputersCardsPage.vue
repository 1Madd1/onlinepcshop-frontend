<template>
  <page-title p-title="Business Computers" />
  <computers-cards p-type="business" />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import ComputersCards from "components/computers/ComputersCards.vue";

export default {

  components: {ComputersCards, PageTitle},
}
</script>
