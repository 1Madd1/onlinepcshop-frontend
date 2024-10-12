<template>
  <div class="q-pa-sm main-div">
    <fieldset class="form-filedset">
      <legend class="form-filedset-legend">{{ legendText }}
      </legend>
      <q-form ref="userForm" @submit.prevent="addOrUpdateButton.methodToInvoke">

          <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
            <q-input
              v-model="user.firstName"
              outlined
              label="First Name"
              dense
              :rules="rules.firstNameRule"
            />
          </div>

          <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
            <q-input
              v-model="user.lastName"
              outlined
              label="Last Name"
              dense
              :rules="rules.lastNameRule"
            />
          </div>

          <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
            <q-input
              v-model="user.email"
              outlined
              label="eMail"
              dense
              :rules="rules.emailRule"
            />
          </div>

<!--          TODO: check existing phone number validation library -->
          <div class="q-mb-sm q-pr-none q-pr-md-xs col-md-3 col-12">
            <q-input
              filled
              v-model="user.telephone"
              label="Phone Number"
              mask="(###) ### - ####"
              hint="Mask: (###) ### - ####"
              outlined
              dense
              :rules="rules.telephoneRule"
            />
          </div>
        <div>
          <q-btn :label="addOrUpdateButton.displayText" class="q-mr-sm " type="submit" color="primary" :disable="updateButtonDisabled"/>
          <q-btn v-if="!pEditMode" :label="addAndNewFormButtonDisplayText" class="q-mr-sm" type="button" color="primary" @click="addAndClearForm" />
        </div>
      </q-form>
    </fieldset>
  </div>
</template>
<script>
import {Notify} from "quasar";
import apiClient from "src/lib/api-clients/api-client";
import {useSecurityStore} from "stores/securityStore";

export default {
  props: {
    pEditMode: {
      type: Boolean,
      default: false
    },
    pUser: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: null,
          principalId: null,
          email: null,
          firstName: null,
          lastName: null,
          telephone: null,
        }
      }
    }
  },
  data() {
    return {
      securityStore: useSecurityStore(),
      user: JSON.parse(JSON.stringify(this.pUser)),
      addOrUpdateButton: {
        displayText: this.pEditMode ? "Edit" : "Add",
        methodToInvoke: this.pEditMode ? this.updateUser : () => {this.addNewUser()},
      },
      addAndNewFormButtonDisplayText: "Add & Continue on New Form",
      rules: {
        emailRule: [
          (val, rules) => rules.email(val) || 'Insert valid eMail!'
        ],
        firstNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid first Name!"
        ],
        lastNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid last Name!"
        ],
        telephoneRule: [
          (val) => val !== null && val.length > 0 || "Insert valid last Name!"
        ],
      },
    }
  },
  computed: {
    updateButtonDisabled() {
      return false;
    },
    legendText() {
      return this.pEditMode ? "User info" : "Creating new User";
    }
  },
  created() {

  },
  methods: {
    async addNewUser(ignore = false) {
      let user = await apiClient.request('post', '/user', null, this.user);
      if (user !== null) {
        Notify.create("User " + user.firstName + " " + user.lastName + " has been added!");
        if (!ignore) {
          this.$router.go(-1);
        }
      }
    },
    async addAndClearForm() {
      await this.addNewUser(true);
      this.clearData();
      this.$refs.userForm.reset();
    },
    async updateUser() {
      let user = await apiClient.request('put', '/user', null, this.user);
      if (user !== null) {
        Notify.create("User " + user.firstName + " " + user.lastName + " has been edited!");
        this.$router.go(-1);
      }
    },
    clearData() {
      this.clearJsonObject(this.user);
    },
    clearJsonObject(jsonObject) {
      for (const key in jsonObject) {
        if (typeof jsonObject[key] == "string") {
          jsonObject[key] = '';
        } else if (Array.isArray(jsonObject[key])) {
          jsonObject[key] = [];
        }
      }
    },
  }
}
</script>
