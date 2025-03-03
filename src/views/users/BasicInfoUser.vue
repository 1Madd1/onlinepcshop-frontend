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
          password: null,
          principalId: null,
          email: null,
          username: null,
          street: null,
          postalCode: null,
          firstName: null,
          lastName: null,
          phoneNumber: null,
        }
      }
    }
  }
}
</script>
