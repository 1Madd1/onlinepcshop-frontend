<template>
  <page-title p-title="Users" />
  <users-list />
  <new-entity-button p-label="Add User" :p-method-to-invoke="openNewUserPage"/>
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewEntityButton from "components/general/NewEntityButton.vue";
import UsersList from "components/users/UsersList.vue";

export default {

  components: {NewEntityButton, PageTitle, UsersList},
  methods: {
    openNewUserPage() {
      this.$router.push("/new-user");
    }
  }
}
</script>
