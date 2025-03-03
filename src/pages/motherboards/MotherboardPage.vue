<template>
  <div v-if="checkMotherboard">
    <page-title :p-title="'Motherboard - ' + motherboard.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="motherboardInfo" label="Motherboard Info" :to="{ query: { id: $route.query.id, tab: 'motherboardInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="motherboardInfo" class="q-pa-none">
          <basic-info-motherboard v-if="securityStore.role === 'ROLE_ADMIN'" :p-motherboard="motherboard" />
          <motherboard-product-info v-else :p-motherboard="motherboard" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoMotherboard from "src/views/motherboards/BasicInfoMotherboard.vue";
import MotherboardProductInfo from "src/views/motherboards/MotherboardProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {MotherboardProductInfo, BasicInfoMotherboard, PageTitle},
  data() {
    return {
      tab: "motherboardInfo",
      motherboard: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkMotherboard() {
      return this.motherboard !== null;
    }
  },
  async created() {
    let motherboardId = this.$route.query.id;
    this.motherboard = await apiClient.request('get', `/motherboard/${motherboardId}`, null, null);
  },

}
</script>
