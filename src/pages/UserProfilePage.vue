<template>
  <q-page class="q-pa-md" v-if="securityStore.user !== null">
    <div class="row col-12 q-mt-md q-pa-md" style="border: 1px solid black;">
      <div class="col-lg-4 col-md-8 col-sm-12 col-xs-12" style="margin-left: 5%;">
        <div class="row full-width q-pl-lg-xs q-pl-md-xs q-mt-lg-none q-mt-md-none q-mt-sm-md q-mt-xs-md">
          <q-card class="q-pa-xs full-width profile-card">
            <q-card-section>
              <q-form class="q-mb-xs" @submit.prevent="editUser">
                <div class="row">
                  <label class="text-bold col-5">First Name</label>
                  <q-space/>
                  <label class="text-bold col-5">Last Name</label>
                  <div class="col-5">
                    <q-input
                      class="q-mt-sm full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.firstName"
                      :rules="rules.firstNameRule"
                    />
                  </div>
                  <q-space/>
                  <div class="col-5">
                    <q-input
                      class="q-mt-sm full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.lastName"
                      :rules="rules.lastNameRule"
                    />
                  </div>
                </div>
                <div class="row q-mt-md">
                  <div class="row col-12">
                    <label class="text-bold">Email</label>
                    <q-input
                      class="q-mt-sm  full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.email"
                      :rules="rules.emailRule"
                    />
                  </div>
                  <div class="row col-12 q-mt-md">
                    <label class="text-bold">Username</label>
                    <q-input
                      class="q-mt-sm full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.username"
                      :rules="rules.usernameRule"
                      maxlength="15"
                    />
                  </div>
                  <div class="row col-12 q-mt-md">
                    <label class="text-bold">Street</label>
                    <q-input
                      class="q-mt-sm  full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.street"
                    />
                  </div>
                </div>
                <div class="row q-mt-md">
                  <label class="text-bold col-5">Postal Code</label>
                  <q-space/>
                  <label class="text-bold col-5">Phone Number</label>
                  <div class="col-5">
                    <q-input
                      class="q-mt-sm full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.postalCode"
                    />
                  </div>
                  <q-space/>
                  <div class="col-5">
                    <q-input
                      class="q-mt-sm full-width"
                      :class="
                        $q.dark.isActive ? 'input-custom-dark' : 'input-custom'
                      "
                      borderless
                      v-model="user.phoneNumber"
                      mask="(###) ### - ####"
                      hint="Mask: (###) ### - ####"
                    />
                  </div>
                </div>
                <div class="row q-mt-md">
                  <q-btn label="Change Password" color="primary" class="q-mt-sm col-5 custom-btn" @click="changePassword" />
                  <q-space/>
                  <q-btn label="Save" type="submit" color="primary" class="q-mt-sm col-5 custom-btn" :disable="checkIfUserFormIsChanged" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-space/>
      <div class="col-lg-4" style="margin-right: 5%">
        <q-card class="card-item">
          <h3>Credit Card</h3>
          <q-img src="src/img/pngkit_credit-card-logo-png_870229.png" width="100%" height="19%"/>
          <h3 v-if="this.creditCard.cardNumber !== null" >{{ this.creditCard.cardNumber.substring(0, 4) }}-****-****-****</h3>
          <q-btn v-if="this.creditCard.cardNumber !== null" label="Remove Credit Card" color="red-5" class="q-mt-sm col-6 custom-btn" @click="showRemoveCreditCardDialog" />
          <q-btn v-if="this.creditCard.cardNumber !== null" label="Change Credit Card" color="primary" class="q-mt-sm col-6 custom-btn" @click="showCreditCardPrompt" />
          <q-btn v-else label="Add New Credit Card" color="primary" class="q-mt-sm col-6 custom-btn" @click="showCreditCardPrompt" />
        </q-card>
        <credit-card-form-dialog :p-credit-card="creditCard" :p-credit-card-form="creditCardForm" :p-credit-card-prompt="creditCardPrompt" @dialog-closed="closeCreditCardDialog" />
      </div>
    </div>
    <d-s-change-password-dialog
      :p-show="showChangePasswordDialog"
      @dialog-closed="showPasswordDialogClosed"
    />
    <q-dialog v-model="removeCreditCardDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you want to remove credit card?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Yes" color="green" v-close-popup @click="removeCreditCard" />
          <q-btn flat label="No" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import {useSecurityStore} from "stores/securityStore";
import utilMethods from "components/util/util-methods";
import apiClient from "src/lib/api-clients/api-client";
import {Notify} from "quasar";
import DSChangePasswordDialog from "components/general/DSChangePasswordDialog.vue";
import CreditCardFormDialog from "components/general/CreditCardFormDialog.vue";

export default {
  components: {CreditCardFormDialog, DSChangePasswordDialog},
  data() {
    return {
      loadedUserJson: null,
      loadedCreditCardJson: null,
      showChangePasswordDialog: false,
      removeCreditCardDialog: false,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        street: null,
        postalCode: null,
        phoneNumber: null,
        password: null,
        creditCardId: null,
      },
      creditCard: {
        id: null,
        cardNumber: null,
        nameOnCard: null,
        expiryDate: null,
        cvv: null,
      },
      creditCardForm: {
        id: null,
        cardNumber: null,
        nameOnCard: null,
        expiryDate: null,
        cvv: null,
      },
      securityStore: useSecurityStore(),
      creditCardPrompt: false,
      buttonLabel: null,
      rules: {
        emailRule: [
          (val, rules) => val !== null && val.length > 0 && utilMethods.validateEmail(val) || 'Insert valid email!'
        ],
        firstNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid first name!"
        ],
        lastNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid last name!"
        ],
        usernameRule: [
          (val) => val !== null && val.length > 0 && val.length < 16 || "Insert valid username!"
        ],
      },
    };
  },
  computed: {
    checkIfUserHasCreditCard() {
      return this.user.creditCardId !== null;
    },
    checkIfUserFormIsChanged() {
      return JSON.stringify(this.user) === this.loadedUserJson;
    },
  },
  created() {
  },
  mounted() {
    if (this.securityStore.role !== "ROLE_USER") {
      Notify.create({
        color: "negative",
        icon: "warning",
        message: "You have to be logged in as a user to use this page!"
      });
      this.$router.push({
        path: "/"
      });
    }
    this.user = this.securityStore.user;
    if (this.user !== null) {
      if (this.user.creditCardId !== null) {
        apiClient.request("get","/credit-card/" + this.user.creditCardId, null, null)
          .then(
            result => {
              this.creditCard = result;
              this.loadedCreditCardJson = JSON.stringify(this.creditCard);
            }
          );
      }
    }
    this.loadedUserJson = JSON.stringify(this.user);
  },
  methods: {
    changePassword() {
      this.showChangePasswordDialog = !this.showChangePasswordDialog;
    },
    showRemoveCreditCardDialog() {
      this.removeCreditCardDialog = !this.removeCreditCardDialog;
    },
    showPasswordDialogClosed() {
      this.showChangePasswordDialog = false;
    },
    closeCreditCardDialog() {
      this.creditCardPrompt = false;
    },
    showCreditCardPrompt() {
      this.creditCardPrompt = !this.creditCardPrompt;
    },
    async editUser() {
      let user = await apiClient.request("put","/user", null, this.user);
      if (user !== null) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "User " + user.username + " has been updated!",
        });
        location.reload();
      } else {
        Notify.create({
          color: "negative",
          icon: "warning",
          message: "User has not been updated!"
        });
      }
    },
    async removeCreditCard() {
      let removeCreditCardRequest = {
        creditCardId: this.creditCard.id,
        userId: this.user.id,
      }
      await apiClient.request("delete","/credit-card", null, removeCreditCardRequest).then(
        result => {
          if (result) {
            Notify.create({
              color: "positive",
              icon: "check",
              message: "Credit card has been removed!",
            });
            this.user.creditCardId = null;
            location.reload();
          } else {
            Notify.create({
              color: "negative",
              icon: "warning",
              message: "Credit card has not been removed!"
            });
          }
        }
      );
    },
  },
}
</script>

<style>
h3 {
  text-align: center;
  margin: 5%;
}

.card-item {
  border-radius: 5px;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid black;
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid black;
}

.input-custom input {
  background-color: rgba(243, 244, 246);
  padding: 10px;
  border-radius: 5px;
}

.input-custom-dark input {
  background-color: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 5px;
}

.custom-btn {
  border-radius: 5px;
  width: 100%;
  color: white;
  font-size: 130%;
}
</style>
