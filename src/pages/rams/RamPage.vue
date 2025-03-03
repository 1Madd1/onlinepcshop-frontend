<template>
  <div v-if="checkRam">
    <page-title :p-title="'Ram - ' + ram.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="ramInfo" label="Ram Info" :to="{ query: { id: $route.query.id, tab: 'ramInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="ramInfo" class="q-pa-none">
          <basic-info-ram v-if="securityStore.role === 'ROLE_ADMIN'" :p-ram="ram" />
          <ram-product-info v-else :p-ram="ram" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoRam from "src/views/rams/BasicInfoRam.vue";
import RamProductInfo from "src/views/rams/RamProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {RamProductInfo, BasicInfoRam, PageTitle},
  data() {
    return {
      tab: "ramInfo",
      ram: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkRam() {
      return this.ram !== null;
    }
  },
  async created() {
    let ramId = this.$route.query.id;
    this.ram = await apiClient.request('get', `/ram/${ramId}`, null, null);
  },

}
</script>
