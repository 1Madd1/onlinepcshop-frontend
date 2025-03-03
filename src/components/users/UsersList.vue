<template>
  <div>
    <q-table
      flat bordered
      :rows="users"
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
            <span v-else><q-btn size="sm" color="accent" round dense icon="edit" @click="editUser(props.row.id)" /></span>
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
      users: [],
      securityStore: useSecurityStore(),
      columns: [
        {name: "firstName", label: "First Name", field: "firstName", align: "left"},
        {name: "lastName", label: "Last Name", field: "lastName", align: "left"},
        {name: "email", label: "Email", field: "email", align: "left"},
        {name: "telephone", label: "Telephone num.", field: "phoneNumber", align: "left"},
        {name: "street", label: "Street", field: "street", align: "left"},
        {name: "operations", align: "right"},
      ],
    }
  },
  async created() {
    this.users = await apiClient.request('get', `/user`, null, null);
  },
  methods: {
    editUser(userId) {
      this.$router.push({
        path: "/user",
        query: {
          id: userId,
          tab: 'userInfo'
        }
      });
    }
  }
}
</script>
