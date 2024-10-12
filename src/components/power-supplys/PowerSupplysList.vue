<template>
  <div>
    <q-table
      flat bordered
      :rows="powerSupplys"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editPowerSupply(props.row.id)" /></span>
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
      powerSupplys: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "wattage", label: "Wattage", field: "wattage", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.powerSupplys = await apiClient.request('get', `/power-supply`, null, null);
    for (let i = 0; i < this.powerSupplys.length; i++) {
      this.powerSupplys[i].price = this.powerSupplys[i].price + " RSD";
    }
  },
  methods: {
    editPowerSupply(powerSupplyId) {
      this.$router.push({
        path: "/power-supply",
        query: {
          id: powerSupplyId,
          tab: 'powerSupplyInfo'
        }
      });
    },
  }
}
</script>
