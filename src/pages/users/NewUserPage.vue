<template>
  <page-title p-title="New User" />
  <new-user-form />
</template>
<script>
import PageTitle from "components/general/PageTitle.vue";
import NewUserForm from "components/users/NewUserForm.vue";

export default {
  components: {NewUserForm, PageTitle}

}
</script>
