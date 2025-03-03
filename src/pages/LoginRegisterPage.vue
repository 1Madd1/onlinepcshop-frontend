<template>
  <div class="login-page">
    <q-layout>
      <q-page-container>
        <q-page
          class="window-height window-width row justify-center items-center"
        >
          <div class="row">
            <q-card square class="shadow-24" style="width:300px;">
              <q-card-section style="height:30px;">
                <h4 class="text-h5 q-my-md" style="text-align: center">Registration</h4>
              </q-card-section>
              <q-card-section>
                <q-form ref="registrationForm" class="q-px-sm q-pt-xl q-pb-lg">
                  <q-input square clearable v-model="user.email" :rules="rules.emailRule" type="email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.username" :rules="rules.usernameRule" type="username" label="Username">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.firstName" :rules="rules.firstNameRule" label="First name">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.lastName" :rules="rules.lastNameRule" label="Last name">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.password" type="password" :rules="rules.passwordRule" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-section class="text-center q-pa-sm">
                <a href="#" class="text-grey-6" @click="userClient.login()">Already Registered? Sign In</a>
              </q-card-section>
              <q-card-actions>
                <q-btn unelevated size="lg" color="primary" class="full-width text-white" @click="addNewUser" label="Register" />
              </q-card-actions>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>

</template>

<script>

import {useSecurityStore} from "stores/securityStore";
import {Notify} from "quasar";
import userClient from "src/lib/api-clients/user-client";
import {keycloak} from "boot/keycloak-init";
import utilMethods from "components/util/util-methods";

export default {
  data() {
    return {
      securityStore: useSecurityStore(),
      userClient: userClient,
      result: [],
      user: {
        id: null,
        principalId: null,
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        // telephone: null,
        password: null,
      },
      rules: {
        emailRule: [
          (val, rules) => val !== null && val.length > 0 && utilMethods.validateEmail(val) || 'Insert valid email!'
        ],
        usernameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid username!"
        ],
        firstNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid first name!"
        ],
        lastNameRule: [
          (val) => val !== null && val.length > 0 || "Insert valid last name!"
        ],
        // telephoneRule: [
        //   (val) => val !== null && val.length > 0 || "Insert valid telephone number!"
        // ],
        passwordRule: [
          (val) => val !== null && val.length > 5 || "Password can't be empty and must be longer than 5 characters!"
        ],
      },
    }
  },
  created() {
    const currentDate = new Date();
    const datetime = "Date n Tym : " + currentDate.getDate() + "/"
      + (currentDate.getMonth() + 1) + "/"
      + currentDate.getFullYear() + " @ "
      + currentDate.getHours() + ":"
      + currentDate.getMinutes() + ":"
      + currentDate.getSeconds();
  },
  computed: {
    hasToken() {
      return localStorage.getItem("auth_token") !== null;
    }
  },
  methods: {
    login() {
      document.cookie = "kc_auth=starting";
      keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
        redirectUri: `${process.env.ROOT_APP_URL}`
      })
    },
    async addNewUser() {
      let user = await this.userClient.registerUser(this.user);
      if (user !== null) {
        Notify.create({
          color: "positive",
          icon: "check",
          message: "You have been registered!"
        });
        this.$refs.registrationForm.reset();
        utilMethods.clearJsonObject(this.user);
      }
    },
  }
}
</script>
