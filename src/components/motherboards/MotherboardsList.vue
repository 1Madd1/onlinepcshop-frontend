<template>
  <div>
    <q-table
      flat bordered
      :rows="motherboards"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editMotherboard(props.row.id)" /></span>
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
      motherboards: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "socketType", label: "Socket Type", field: "socketType", align: "left"},
        {name: "memoryType", label: "Memory Type", field: "memoryType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.motherboards = await apiClient.request('get', `/motherboard`, null, null)
    for (let i = 0; i < this.motherboards.length; i++) {
      this.motherboards[i].price = this.motherboards[i].price + " RSD";
    }
  },
  methods: {
    editMotherboard(motherboardId) {
      this.$router.push({
        path: "/motherboard",
        query: {
          id: motherboardId,
          tab: 'motherboardInfo'
        }
      });
    },
  }
}
</script>
