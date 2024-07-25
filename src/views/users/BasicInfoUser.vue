<template>
  <new-user-form
    :p-edit-mode="true"
    :p-user="pUser"
  />
</template>
<script>
import NewUserForm from "components/users/NewUserForm.vue";

export default {
  components: {NewUserForm},
  props: {
    pUser: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          principalId: null,
          firstName: null,
          lastName: null,
          email: null,
          telephone: null,
        }
      }
    }
  }
}
</script>
