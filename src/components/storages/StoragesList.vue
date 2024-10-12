<template>
  <div>
    <q-table
      flat bordered
      :rows="storages"
      :columns="columns"
      row-key="name"
      no-data-label="No data"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :auto-width="col.name == 'operations'"
          >
            <span v-if="col.name !== 'operations'" >{{ col.value }}</span>
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editStorage(props.row.id)" /></span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";

export default {
  data() {
    return {
      storages: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "storageType", label: "Storage Type", field: "storageType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.storages = await apiClient.request('get', `/storage`, null, null)
    for (let i = 0; i < this.storages.length; i++) {
      this.storages[i].price = this.storages[i].price + " RSD";
    }
  },
  methods: {
    editStorage(storageId) {
      this.$router.push({
        path: "/storage",
        query: {
          id: storageId,
          tab: 'storageInfo'
        }
      });
    },
  }
}
</script>
