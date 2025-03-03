<template>
  <div v-if="checkComputer">
    <page-title :p-title="'Computer - ' + computer.computerName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="computerInfo" label="Computer Info" :to="{ query: { id: $route.query.id, tab: 'computerInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="computerInfo" class="q-pa-none">
          <basic-info-computer v-if="securityStore.role === 'ROLE_ADMIN'" :p-computer="computer" />
          <computer-product-info v-else :p-computer="computer" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoComputer from "src/views/computers/BasicInfoComputer.vue";
import ComputerProductInfo from "src/views/computers/ComputerProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {ComputerProductInfo, BasicInfoComputer, PageTitle},
  data() {
    return {
      tab: "computerInfo",
      computer: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkComputer() {
      return this.computer !== null;
    }
  },
  async created() {
    let computerId = this.$route.query.id;
    this.computer = await apiClient.request('get', `/computer/${computerId}`, null, null);
  },

}
</script>
