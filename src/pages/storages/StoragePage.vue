<template>
  <div v-if="checkStorage">
    <page-title :p-title="'Storage - ' + storage.componentName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="storageInfo" label="Storage Info" :to="{ query: { id: $route.query.id, tab: 'storageInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="storageInfo" class="q-pa-none">
          <basic-info-storage v-if="securityStore.role === 'ROLE_ADMIN'" :p-storage="storage" />
          <storage-product-info v-else :p-storage="storage" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoStorage from "src/views/storages/BasicInfoStorage.vue";
import StorageProductInfo from "src/views/storages/StorageProductInfo.vue";
import {useSecurityStore} from "stores/securityStore";

export default {
  components: {StorageProductInfo, BasicInfoStorage, PageTitle},
  data() {
    return {
      tab: "storageInfo",
      storage: null,
      securityStore: useSecurityStore()
    }
  },
  computed: {
    checkStorage() {
      return this.storage !== null;
    }
  },
  async created() {
    let storageId = this.$route.query.id;
    this.storage = await apiClient.request('get', `/storage/${storageId}`, null, null);
  },

}
</script>
