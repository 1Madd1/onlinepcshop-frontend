<template>
  <div>
    <q-table
      flat bordered
      :rows="caseFans"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editCaseFan(props.row.id)" /></span>
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
      caseFans: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "componentName", label: "Name", field: "componentName", align: "left"},
        {name: "quantity", label: "Quantity", field: "quantity", align: "left"},
        {name: "price", label: "Price", field: "price", align: "left"},
        {name: "fanSize", label: "Fan Size", field: "fanSize", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.caseFans = await apiClient.request('get', `/case-fan`, null, null)
    for (let i = 0; i < this.caseFans.length; i++) {
      this.caseFans[i].price = this.caseFans[i].price + " RSD";
      this.caseFans[i].fanSize = this.caseFans[i].fanSize + " mm";
    }
  },
  methods: {
    editCaseFan(caseFanId) {
      this.$router.push({
        path: "/case-fan",
        query: {
          id: caseFanId,
          tab: 'caseFanInfo'
        }
      });
    },
  }
}
</script>
