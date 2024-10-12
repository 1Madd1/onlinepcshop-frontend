<template>
  <div>
    <q-table
      flat bordered
      :rows="gpus"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editGpu(props.row.id)" /></span>
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
      gpus: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "pcieType", label: "PCIe Type", field: "pcieType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.gpus = await apiClient.request('get', `/gpu`, null, null)
    for (let i = 0; i < this.gpus.length; i++) {
      this.gpus[i].price = this.gpus[i].price + " RSD";
    }
  },
  methods: {
    editGpu(gpuId) {
      this.$router.push({
        path: "/gpu",
        query: {
          id: gpuId,
          tab: 'gpuInfo'
        }
      });
    },
  }
}
</script>
