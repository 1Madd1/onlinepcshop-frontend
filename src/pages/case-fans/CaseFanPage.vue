<template>
  <div v-if="checkCaseFan">
    <page-title :p-title="'Case Fan - ' + caseFan.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="caseFanInfo" label="Case Fan Info" :to="{ query: { id: $route.query.id, tab: 'caseFanInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="caseFanInfo" class="q-pa-none">
          <basic-info-case-fan :p-case-fan="caseFan" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoCaseFan from "src/views/case-fans/BasicInfoCaseFan.vue";

export default {
  components: {BasicInfoCaseFan, PageTitle},
  data() {
    return {
      tab: "caseFanInfo",
      caseFan: null,
    }
  },
  computed: {
    checkCaseFan() {
      return this.caseFan !== null;
    }
  },
  async created() {
    let caseFanId = this.$route.query.id;
    this.caseFan = await apiClient.request('get', `/case-fan/${caseFanId}`, null, null);
  },

}
</script>
