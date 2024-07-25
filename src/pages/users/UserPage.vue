<template>
  <div v-if="checkUser">
    <page-title :p-title="'User - ' + user.firstName + ' ' + user.lastName" />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-route-tab name="userInfo" label="User Info" :to="{ query: { id: $route.query.id, tab: 'userInfo'}}" />
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="userInfo" class="q-pa-none">
          <basic-info-user :p-user="user" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import apiClient from "src/lib/api-clients/api-client";
import BasicInfoUser from "src/views/users/BasicInfoUser.vue";

export default {
  components: {BasicInfoUser, PageTitle},
  data() {
    return {
      tab: "userInfo",
      user: null,
    }
  },
  computed: {
    checkUser() {
      return this.user !== null;
    }
  },
  async created() {
    let userId = this.$route.query.id;
    this.user = await apiClient.request('get', `/user/${userId}`, null, null);
  },

}
</script>
