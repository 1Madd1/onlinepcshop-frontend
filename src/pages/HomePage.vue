<template>
    <div class="q-pt-lg">
      <div class="text-center text-h3">
        Welcome to Online PC Shop
      </div>
      <div class="row q-mt-lg">
        <div class="col-lg-3 col-xs-0"></div>
        <div class="col-lg-6 col-xs-12 q-pa-xs-lg q-pa-lg-none">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non erat scelerisque justo ullamcorper elementum eu in felis. Donec fermentum lectus quis nibh dapibus ultrices. Mauris ante velit, vehicula nec ante vitae, faucibus cursus mauris. Integer condimentum, diam a bibendum rhoncus, felis risus dictum felis, eu posuere risus sem vitae neque. Proin rutrum odio sit amet purus pretium finibus. Aliquam ac erat augue. Suspendisse elementum, elit a lobortis euismod, est eros congue erat, nec sagittis nibh orci id augue. Phasellus ut velit ultrices, pellentesque sapien in, mollis lacus. Pellentesque sit amet congue massa, a vehicula mi. Nullam viverra pretium est, at faucibus nulla efficitur sed. Cras vel tempor odio, at iaculis urna. Etiam nisi arcu, elementum ac tempor quis, maximus non purus. In hac habitasse platea dictumst. Vestibulum et arcu ac purus vehicula euismod ut ac sapien. Praesent elit purus, volutpat vestibulum consequat sed, commodo eget nisi. Nam ut sollicitudin arcu.</p>
          <p>Ut auctor sagittis sapien et sollicitudin. Curabitur eleifend iaculis tortor vel vestibulum. Nullam mollis ultricies leo et tempor. Curabitur eu risus at lectus varius ullamcorper. Nullam ut est vitae ipsum dapibus porta. Quisque quis venenatis neque. Integer pretium libero vel finibus malesuada. Integer a lacus magna. Aliquam erat volutpat. Pellentesque interdum metus vel diam interdum bibendum. Sed non lacus porta, lobortis libero sit amet, scelerisque tortor. Nunc bibendum bibendum lacus, quis posuere enim accumsan ut. Duis laoreet ullamcorper euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Maecenas posuere, tortor at hendrerit congue, ante diam suscipit mauris, sed lobortis purus libero a lectus. Mauris sollicitudin mi fringilla, sodales nulla nec, consequat tortor. Aenean erat libero, commodo id lobortis ut, consectetur in turpis. Mauris leo dolor, porttitor vitae lectus id, molestie efficitur lacus. Sed dictum risus est, nec laoreet nunc semper sit amet. Fusce at metus nec felis volutpat ullamcorper. Praesent vel orci sem. Suspendisse odio elit, bibendum a convallis a, hendrerit non leo. Integer ullamcorper, ex in convallis auctor, felis quam mollis risus, non dignissim nulla massa at massa. Curabitur pretium auctor nibh quis consectetur. Aliquam finibus feugiat erat ornare hendrerit. Vivamus nec lectus accumsan, euismod libero porta, dapibus dui. Proin porta a ante ac convallis. Ut lacinia iaculis scelerisque. Curabitur aliquam ultricies magna a viverra.</p>
        </div>
        <div class="col-lg-3 col-xs-0"></div>
      </div>
      <div class="q-pt-lg text-center">
        <q-btn color="white" text-color="black" label="Login" @click="login" />
      </div>
    </div>
</template>
<script>

import Keycloak from "keycloak-js";
import {useSecurityStore} from "stores/securityStore";

const keycloak = new Keycloak({
  url: `${process.env.ROOT_IDP_URL}/auth`,
  realm: "onlinepcshop-realm",
  clientId: "onlinepcshop-fe-client",
  onLoad: "login-required"
});

export default {
  data() {
    return {
      securityStore: useSecurityStore()
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
  }
}
</script>
