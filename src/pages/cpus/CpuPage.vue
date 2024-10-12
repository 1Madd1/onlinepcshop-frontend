<template>
  <div v-if="checkCpu">
    <page-title :p-title="'Cpu - ' + cpu.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="cpuInfo" label="Cpu Info" :to="{ query: { id: $route.query.id, tab: 'cpuInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="cpuInfo" class="q-pa-none">
          <basic-info-cpu :p-cpu="cpu" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoCpu from "src/views/cpus/BasicInfoCpu.vue";

export default {
  components: {BasicInfoCpu, PageTitle},
  data() {
    return {
      tab: "cpuInfo",
      cpu: null,
    }
  },
  computed: {
    checkCpu() {
      return this.cpu !== null;
    }
  },
  async created() {
    let cpuId = this.$route.query.id;
    this.cpu = await apiClient.request('get', `/cpu/${cpuId}`, null, null);
  },

}
</script>
