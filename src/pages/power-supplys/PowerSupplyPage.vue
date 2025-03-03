<template>
  <div v-if="checkPowerSupply">
    <page-title :p-title="'Power Supply - ' + powerSupply.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="powerSupplyInfo" label="Power Supply Info" :to="{ query: { id: $route.query.id, tab: 'powerSupplyInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="powerSupplyInfo" class="q-pa-none">
          <basic-info-power-supply v-if="securityStore.role === 'ROLE_ADMIN'" :p-power-supply="powerSupply" />
          <power-supply-product-info v-else :p-power-supply="powerSupply" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoPowerSupply from "src/views/power-supplys/BasicInfoPowerSupply.vue";
import PowerSupplyProductInfo from "src/views/power-supplys/PowerSupplyProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {PowerSupplyProductInfo, BasicInfoPowerSupply, PageTitle},
  data() {
    return {
      tab: "powerSupplyInfo",
      powerSupply: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkPowerSupply() {
      return this.powerSupply !== null;
    }
  },
  async created() {
    let powerSupplyId = this.$route.query.id;
    this.powerSupply = await apiClient.request('get', `/power-supply/${powerSupplyId}`, null, null);
  },

}
</script>
