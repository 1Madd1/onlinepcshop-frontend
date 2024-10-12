<template>
  <div>
    <q-table
      flat bordered
      :rows="rams"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editRam(props.row.id)" /></span>
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
      rams: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "memoryType", label: "Memory Type", field: "memoryType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.rams = await apiClient.request('get', `/ram`, null, null)
    for (let i = 0; i < this.rams.length; i++) {
      this.rams[i].price = this.rams[i].price + " RSD";
    }
  },
  methods: {
    editRam(ramId) {
      this.$router.push({
        path: "/ram",
        query: {
          id: ramId,
          tab: 'ramInfo'
        }
      });
    },
  }
}
</script>
