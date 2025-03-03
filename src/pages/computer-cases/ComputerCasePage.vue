<template>
  <div v-if="checkComputerCase">
    <page-title v-if="securityStore.role === 'ROLE_USER'" :p-title="'Computer Case - ' + computerCase.componentName" />
    <page-title v-else :p-title="computerCase.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey bg-grey-4"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="computerCaseInfo" label="Computer Case Info" :to="{ query: { id: $route.query.id, tab: 'computerCaseInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="computerCaseInfo" class="q-pa-none">
          <basic-info-computer-case v-if="securityStore.role === 'ROLE_ADMIN'" :p-computer-case="computerCase" />
          <computer-case-product-info v-else :p-computer-case="computerCase" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoComputerCase from "src/views/computer-cases/BasicInfoComputerCase.vue";
import {useSecurityStore} from "stores/securityStore";
import ComputerCaseProductInfo from "src/views/computer-cases/ComputerCaseProductInfo.vue";

export default {
  components: {ComputerCaseProductInfo, BasicInfoComputerCase, PageTitle},
  data() {
    return {
      tab: "computerCaseInfo",
      computerCase: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkComputerCase() {
      return this.computerCase !== null;
    }
  },
  async created() {
    let computerCaseId = this.$route.query.id;
    this.computerCase = await apiClient.request('get', `/computer-case/${computerCaseId}`, null, null);
  },

}
</script>
