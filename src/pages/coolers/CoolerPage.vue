<template>
  <div v-if="checkCooler">
    <page-title :p-title="'Cooler - ' + cooler.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="coolerInfo" label="Cooler Info" :to="{ query: { id: $route.query.id, tab: 'coolerInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="coolerInfo" class="q-pa-none">
          <basic-info-cooler :p-cooler="cooler" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoCooler from "src/views/coolers/BasicInfoCooler.vue";

export default {
  components: {BasicInfoCooler, PageTitle},
  data() {
    return {
      tab: "coolerInfo",
      cooler: null,
    }
  },
  computed: {
    checkCooler() {
      return this.cooler !== null;
    }
  },
  async created() {
    let coolerId = this.$route.query.id;
    this.cooler = await apiClient.request('get', `/cooler/${coolerId}`, null, null);
  },

}
</script>
