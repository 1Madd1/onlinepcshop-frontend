<template>
  <q-layout view="hhh lpR fff">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <div class="flex justify-between">
            <div>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
              </q-avatar>
              Online PC Shop
            </div>
            <!--            <div>-->
            <!--              <q-breadcrumbs active-color="white" separator-color="black">-->
            <!--                <span v-for="(crumb, index) in breadcrumbs" :key="crumb">-->
            <!--                  <q-breadcrumbs-el v-if="index === 0" label="Home" to="/" />-->
            <!--                  <q-breadcrumbs-el v-else :label="' / ' + crumb" />-->
            <!--                    TODO: use this code when there is more than one breadcrumb el with to route -->
            <!--                  <q-breadcrumbs-el v-else-if="index == breadcrumbs.length - 1" :label="' / ' + crumb" />-->
            <!--                  <q-breadcrumbs-el v-else :label="' / ' + crumb" :to="createPath(index)" />-->
            <!--                </span>-->
            <!--              </q-breadcrumbs>-->
            <!--            </div>-->
            <div>
              <span v-if="checkLoggedInUser" style="padding-right: 1.5%">email: {{ getUserEmail() }}</span>
              <span v-if="checkLoggedInAdmin" style="padding-right: 1.5%">ADMIN PANEL</span>
              <q-btn label="Logout" color="white" text-color="black" class="q-mr-sm" @click="logout"/>
              <q-btn label="Change password" color="white" text-color="black" @click="changePassword"/>
            </div>
          </div>

        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <left-drawer-content/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <d-s-change-password-dialog
      :p-show="showChangePasswordDialog"
      @dialog-closed="showPasswordDialogClosed"
    />

  </q-layout>
</template>

<script>
import LeftDrawerContent from "components/main-layout/LeftDrawerContent.vue";
import {useSecurityStore} from "stores/securityStore";
import DSChangePasswordDialog from "components/general/DSChangePasswordDialog.vue";

export default {
  components: {LeftDrawerContent, DSChangePasswordDialog},
  data() {
    return {
      showChangePasswordDialog: false,
      leftDrawerOpen: false,
      securityStore: useSecurityStore(),
      breadcrumbs: null,
    }
  },
  computed: {
    checkLoggedInUser() {
      return this.securityStore.user !== null;
    },
    checkLoggedInAdmin() {
      return this.securityStore.role === 'ROLE_ADMIN';
    },
  },
  created() {
    this.createBreadcrumbs();
    if (!this.checkLoggedInUser) {

    }
  },
  methods: {
    createBreadcrumbs() {
      if (this.$route.path === '/') {
        this.breadcrumbs = [''];
      } else {
        this.breadcrumbs = this.$route.path.split("/");
      }
    },
    getUserEmail() {
      if (this.securityStore.user !== null) {
        return this.securityStore.user.email;
      }
    },
    createPath(endIndex) {
      let path = '';
      for (let i in this.breadcrumbs) {
        if (i == 0) continue;
        path += '/' + this.breadcrumbs[i];
        if (i == endIndex) break;
      }
      return path;
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    cleanUp() {
      localStorage.removeItem("auth_token");

      // clear all cookies
      const cookies = document.cookie.split(";");
      for (const element of cookies) {
        const cookie = element;
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
    logout() {
      this.cleanUp();
      this.securityStore.keycloak.logout();

    },
    changePassword() {
      this.showChangePasswordDialog = !this.showChangePasswordDialog;
    },
    showPasswordDialogClosed() {
      this.showChangePasswordDialog = false;
    },
  },

}
</script>
