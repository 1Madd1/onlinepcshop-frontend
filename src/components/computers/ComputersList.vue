<template>
  <div>
    <q-table
      flat bordered
      :rows="computers"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editComputer(props.row.id)" /></span>
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
      computers: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "computerName", label: "Name", field: "computerName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "computerType", label: "Computer Type", field: "computerType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.computers = await apiClient.request('get', `/computer`, null, null);
    for (let i = 0; i < this.computers.length; i++) {
      this.computers[i].price = this.computers[i].price + " RSD";
    }
  },
  methods: {
    editComputer(computerId) {
      this.$router.push({
        path: "/computer",
        query: {
          id: computerId,
          tab: 'computerInfo'
        }
      });
    },
  }
}
</script>
