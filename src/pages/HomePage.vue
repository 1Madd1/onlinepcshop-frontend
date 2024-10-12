<!--<template>-->
<!--    <div class="q-pt-lg">-->
<!--      <div class="text-center text-h3">-->
<!--        Welcome to Online PC Shop-->
<!--      </div>-->
<!--      <div class="row q-mt-lg">-->
<!--        <div class="col-lg-3 col-xs-0"></div>-->
<!--        <div class="col-lg-6 col-xs-12 q-pa-xs-lg q-pa-lg-none">-->
<!--          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non erat scelerisque justo ullamcorper elementum eu in felis. Donec fermentum lectus quis nibh dapibus ultrices. Mauris ante velit, vehicula nec ante vitae, faucibus cursus mauris. Integer condimentum, diam a bibendum rhoncus, felis risus dictum felis, eu posuere risus sem vitae neque. Proin rutrum odio sit amet purus pretium finibus. Aliquam ac erat augue. Suspendisse elementum, elit a lobortis euismod, est eros congue erat, nec sagittis nibh orci id augue. Phasellus ut velit ultrices, pellentesque sapien in, mollis lacus. Pellentesque sit amet congue massa, a vehicula mi. Nullam viverra pretium est, at faucibus nulla efficitur sed. Cras vel tempor odio, at iaculis urna. Etiam nisi arcu, elementum ac tempor quis, maximus non purus. In hac habitasse platea dictumst. Vestibulum et arcu ac purus vehicula euismod ut ac sapien. Praesent elit purus, volutpat vestibulum consequat sed, commodo eget nisi. Nam ut sollicitudin arcu.</p>-->
<!--          <p>Ut auctor sagittis sapien et sollicitudin. Curabitur eleifend iaculis tortor vel vestibulum. Nullam mollis ultricies leo et tempor. Curabitur eu risus at lectus varius ullamcorper. Nullam ut est vitae ipsum dapibus porta. Quisque quis venenatis neque. Integer pretium libero vel finibus malesuada. Integer a lacus magna. Aliquam erat volutpat. Pellentesque interdum metus vel diam interdum bibendum. Sed non lacus porta, lobortis libero sit amet, scelerisque tortor. Nunc bibendum bibendum lacus, quis posuere enim accumsan ut. Duis laoreet ullamcorper euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>-->
<!--          <p>Maecenas posuere, tortor at hendrerit congue, ante diam suscipit mauris, sed lobortis purus libero a lectus. Mauris sollicitudin mi fringilla, sodales nulla nec, consequat tortor. Aenean erat libero, commodo id lobortis ut, consectetur in turpis. Mauris leo dolor, porttitor vitae lectus id, molestie efficitur lacus. Sed dictum risus est, nec laoreet nunc semper sit amet. Fusce at metus nec felis volutpat ullamcorper. Praesent vel orci sem. Suspendisse odio elit, bibendum a convallis a, hendrerit non leo. Integer ullamcorper, ex in convallis auctor, felis quam mollis risus, non dignissim nulla massa at massa. Curabitur pretium auctor nibh quis consectetur. Aliquam finibus feugiat erat ornare hendrerit. Vivamus nec lectus accumsan, euismod libero porta, dapibus dui. Proin porta a ante ac convallis. Ut lacinia iaculis scelerisque. Curabitur aliquam ultricies magna a viverra.</p>-->
<!--        </div>-->
<!--        <div class="col-lg-3 col-xs-0"></div>-->
<!--      </div>-->
<!--      <div class="q-pt-lg text-center">-->
<!--        <q-btn color="white" text-color="black" label="Login" @click="login" />-->
<!--      </div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->

<!--import Keycloak from "keycloak-js";-->
<!--import {useSecurityStore} from "stores/securityStore";-->

<!--const keycloak = new Keycloak({-->
<!--  url: `${process.env.ROOT_IDP_URL}/auth`,-->
<!--  realm: "onlinepcshop-realm",-->
<!--  clientId: "onlinepcshop-fe-client",-->
<!--  onLoad: "login-required"-->
<!--});-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      securityStore: useSecurityStore()-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    hasToken() {-->
<!--      return localStorage.getItem("auth_token") !== null;-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    login() {-->
<!--      document.cookie = "kc_auth=starting";-->
<!--      keycloak.init({-->
<!--        onLoad: "login-required",-->
<!--        checkLoginIframe: false,-->
<!--        redirectUri: `${process.env.ROOT_APP_URL}`-->
<!--      })-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background: linear-gradient(#8c929c, #777a80);"
      >
        <div v-if="loginCardShow" class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:300px;height:250px;">
              <q-card-section>
                <h4 class="text-h5 q-my-md" style="text-align: center">Select an option</h4>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="lg" color="blue-7" class="full-width text-white" label="Login" @click="login" />
              </q-card-actions>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="lg" color="blue-7" class="full-width text-white" label="Register" @click="changeCard" />
              </q-card-actions>
<!--              <q-card-section class="text-center q-pa-sm">-->
<!--                <p class="text-grey-6">Forgot your password?</p>-->
<!--              </q-card-section>-->
            </q-card>
          </div>
        </div>
        <div v-else class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:300px;height:470px;">
              <q-card-section style="height:30px;">
                <h4 class="text-h5 q-my-md" style="text-align: center">Registration</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl q-pb-lg">
                  <q-input square clearable v-model="user.email" type="email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.username" type="username" label="Username">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.firstName" label="First name">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.lastName" label="Last name">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.telephone" mask="(###) ### - ####" hint="Mask: (###) ### - ####" label="Telephone">
                    <template v-slot:prepend>
                      <q-icon name="phone" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.password" type="password" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="lg" color="blue-7" class="full-width text-white" @click="addNewUser" label="Register" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <a href="#" class="text-grey-6" @click="changeCard">Return to login</a>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import Keycloak from "keycloak-js";
import {useSecurityStore} from "stores/securityStore";
import {Notify} from "quasar";
import userClient from "src/lib/api-clients/user-client";

const keycloak = new Keycloak({
  url: `${process.env.ROOT_IDP_URL}/auth`,
  realm: "onlinepcshop-realm",
  clientId: "onlinepcshop-fe-client",
  onLoad: "login-required"
});

export default {
  data() {
    return {
      securityStore: useSecurityStore(),
      loginCardShow: true,
      result: [],
      user: {
        id: null,
        principalId: null,
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        telephone: null,
        password: null,
      },
    }
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
    changeCard() {
      this.loginCardShow = !this.loginCardShow;
    },
    async addNewUser() {
      // console.log(this.user);
      let user = await userClient.registerUser(this.user);
      console.log(user);
      if (user !== null) {
        Notify.create("User " + user.firstName + " " + user.lastName + " has been added!");
        this.changeCard();
      }
    },
  }
}
</script>

<style>
</style>
