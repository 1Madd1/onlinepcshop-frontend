<template>
  <div v-if="checkGpu">
    <page-title :p-title="'Gpu - ' + gpu.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="gpuInfo" label="Gpu Info" :to="{ query: { id: $route.query.id, tab: 'gpuInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="gpuInfo" class="q-pa-none">
          <basic-info-gpu v-if="securityStore.role === 'ROLE_ADMIN'" :p-gpu="gpu" />
          <gpu-product-info v-else :p-gpu="gpu" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoGpu from "src/views/gpus/BasicInfoGpu.vue";
import GpuProductInfo from "src/views/gpus/GpuProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {GpuProductInfo, BasicInfoGpu, PageTitle},
  data() {
    return {
      tab: "gpuInfo",
      gpu: null,
      securityStore: useSecurityStore(),
    }
  },
  computed: {
    checkGpu() {
      return this.gpu !== null;
    }
  },
  async created() {
    let gpuId = this.$route.query.id;
    this.gpu = await apiClient.request('get', `/gpu/${gpuId}`, null, null);
  },

}
</script>
