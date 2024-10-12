<template>
  <div>
    <q-table
      flat bordered
      :rows="coolers"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editCooler(props.row.id)" /></span>
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
      coolers: [],
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
    this.coolers = await apiClient.request('get', `/cooler`, null, null)
    for (let i = 0; i < this.coolers.length; i++) {
      this.coolers[i].price = this.coolers[i].price + " RSD";
    }
  },
  methods: {
    editCooler(coolerId) {
      this.$router.push({
        path: "/cooler",
        query: {
          id: coolerId,
          tab: 'coolerInfo'
        }
      });
    },
  }
}
</script>
