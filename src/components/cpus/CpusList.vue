<template>
  <div>
    <q-table
      flat bordered
      :rows="cpus"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editCpu(props.row.id)" /></span>
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
      cpus: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "socketType", label: "Socket Type", field: "socketType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.cpus = await apiClient.request('get', `/cpu`, null, null)
    for (let i = 0; i < this.cpus.length; i++) {
      this.cpus[i].price = this.cpus[i].price + " RSD";
    }
  },
  methods: {
    editCpu(cpuId) {
      this.$router.push({
        path: "/cpu",
        query: {
          id: cpuId,
          tab: 'cpuInfo'
        }
      });
    },
  }
}
</script>
