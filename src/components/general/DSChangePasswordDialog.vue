<template>
  <q-dialog v-model="show" @hide="dialogHidden" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Change Password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <q-input v-model="newPassword" :type="newPasswordHidden ? 'password' : 'text'" dense label="New Password" class="q-mb-md">
          <template #append>
            <q-icon
              :name="newPasswordHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="newPasswordHidden = !newPasswordHidden"
            />
          </template>
        </q-input>

        <q-input v-model="confirmPassword" label="Confirm Password" dense type="password" :error-message="passwordMismatchText" :error="hidePasswordMismatchHint"/>
        <span class="text-red">You will me automatically loged out!</span>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Confirm" :disable="changePasswordButtonDisabled" @click="changePassword" />
        <q-btn v-close-popup flat label="Quit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import {Notify} from "quasar";
import {useSecurityStore} from "stores/securityStore";
import apiClient from "src/lib/api-clients/api-client";

export default {
  emits: ["dialogClosed"],
  props: {
    pShow: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    pShow(newValue) {
      this.show = newValue;
    },
    newPassword(newValue) {
      this.checkPasswords();
    },
    confirmPassword(newValue) {
      this.checkPasswords();
    }
  },
  data() {
    return {
      show: false,
      changePasswordButtonDisabled: true,
      passwordMismatchText: "",
      hidePasswordMismatchHint: false,
      newPassword: null,
      newPasswordHidden: true,
      confirmPassword: null,
    }
  },
  methods: {
    async changePassword() {
      if (this.newPassword === this.confirmPassword) {
        await apiClient.request('put', '/user/change-password', null, this.newPassword);
        Notify.create("Password has been changed!");
        useSecurityStore().keycloak.logout();
        this.show = false;
      } else {

      }
    },
    dialogHidden() {
      this.newPassword = null;
      this.confirmPassword = null;
      this.$emit("dialogClosed");
    },
    checkPasswords() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMismatchText = "Passwords do not match!";
        this.hidePasswordMismatchHint = true;
      } else {
        this.changePasswordButtonDisabled = false;
        this.hidePasswordMismatchHint = false;
      }
    }
  }
}
</script>
