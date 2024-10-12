<template>
  <div>
    <q-table
      flat bordered
      :rows="computerCases"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editComputerCase(props.row.id)" /></span>
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
      computerCases: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "caseType", label: "Case Type", field: "caseType", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.computerCases = await apiClient.request('get', `/computer-case`, null, null)
    for (let i = 0; i < this.computerCases.length; i++) {
      this.computerCases[i].price = this.computerCases[i].price + " RSD";
    }
  },
  methods: {
    editComputerCase(computerCaseId) {
      this.$router.push({
        path: "/computer-case",
        query: {
          id: computerCaseId,
          tab: 'computerCaseInfo'
        }
      });
    },
  }
}
</script>
