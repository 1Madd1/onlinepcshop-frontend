<template>
  <page-title p-title="Gaming Computers" />
  <computers-cards p-type="gaming" />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import ComputersCards from "components/computers/ComputersCards.vue";

export default {

  components: {ComputersCards, PageTitle},
}
</script>
