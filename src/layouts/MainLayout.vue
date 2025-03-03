<template>
  <q-layout view="hhh lpR fff">

    <q-header v-if="securityStore.role !== 'ROLE_ADMIN'" reveal elevated class="bg-primary text-white" height-hint="98">
      <div class="q-pa-sm glossy">
        <div class="row">
          <q-toolbar class="col-10 text-white rounded-borders">
              <q-img src="src/img/ezpc-high-resolution-logo-transparent.png" width="12vw" height="6vh" class="q-mt-xs cursor-pointer" @click="returnOnHomePage"/>

            <q-input dark standout dense v-model="searchText" v-on:keyup.enter="search" style="width: 100%;" input-class="text-right" class="q-ml-md">
              <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" @click="search"/>
              </template>
            </q-input>
          </q-toolbar>
          <q-toolbar class="col-2">
            <q-space />
            <div v-if="checkLoggedInUser" class="q-ma-md">Welcome, {{ securityStore.user.username }}</div>
            <div v-else class="text-subtitle1 q-ma-md">Welcome, User</div>
            <q-btn-dropdown class="glossy" >
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  <q-icon name="person" />
                </div>
              </template>
              <div v-if="checkLoggedInUser" class="row no-wrap q-pa-md">
                <div class="column">
                  <q-btn color="primary" class="q-ma-sm" label="User Profile" push size="md" v-close-popup @click="userProfilePage"/>
                  <q-btn color="primary" class="q-ma-sm" label="Purchase History" push size="md" v-close-popup @click="purchaseHistoryPage"/>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="md"
                    style="margin-top: 4vh;"
                    @click="logout"
                    v-close-popup
                  />
                </div>
              </div>
              <div v-else class="row no-wrap q-pa-md">
                <div class="column items-center q-ma-md">
                  <div class="text-subtitle1">
                    Have an account?
                  </div>
                  <q-btn
                    color="primary"
                    label="Login"
                    push
                    size="md"
                    @click="login"
                    v-close-popup
                  />
                </div>
                <q-separator vertical/>
                <div class="column items-center q-ma-md">
                  <div class="text-subtitle1">
                    Don't have an account?
                  </div>
                  <q-btn
                    color="primary"
                    label="Register"
                    push
                    size="md"
                    @click="register"
                    v-close-popup
                  />
                </div>
              </div>
            </q-btn-dropdown>
          </q-toolbar>
        </div>
        <q-toolbar>
          <q-btn flat icon="menu" style="margin-right: 15%" class="q-mt-md" @click="toggleLeftDrawer"/>
          <q-btn flat rounded color="white" class="page-buttons" label="New Products" @click="newProductsPage" />
          <q-btn flat rounded color="white" class="page-buttons" label="Popular Products" @click="popularProductsPage" />
          <q-btn flat rounded color="white" class="page-buttons" label="On Sale" @click="onSalePage"/>
          <q-btn flat rounded color="white" class="page-buttons" label="Manufacturers" @click="manufacturersPage"/>
          <q-space/>
          <q-icon name="shopping_cart" size="md" class="cursor-pointer" style="margin-right: 1.3%" @click="shoppingCartPage" >
            <q-badge v-if="cartStore.numberOfUniqueProducts() !== 0" color="red" floating>{{ cartStore.numberOfUniqueProducts() }}</q-badge>
          </q-icon>
        </q-toolbar>
      </div>
    </q-header>
    <q-header v-else reveal elevated class="bg-primary text-white" height-hint="98">
      <div class="q-pa-sm glossy">
        <div class="row">
          <q-toolbar class="col-10 text-white rounded-borders">
            <q-img src="src/img/ezpc-high-resolution-logo-transparent.png" width="10vw" height="6vh" class="q-mt-xs cursor-pointer" @click="returnOnHomePage"/>
          </q-toolbar>
          <q-toolbar class="col-2">
            <q-space />
            <div class="text-subtitle1 q-ma-md">Welcome, Admin</div>
            <div class="column items-center">
              <q-btn
                color="primary"
                label="Logout"
                push
                size="md"
                @click="logout"
                v-close-popup
              />
            </div>
          </q-toolbar>
        </div>
        <q-toolbar>
          <q-btn flat icon="menu" style="margin-right: 15%" class="q-mt-md" @click="toggleLeftDrawer"/>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer overlay v-model="leftDrawerOpen" side="left" bordered>
      <left-drawer-content @sub-item-clicked="changeLoadSearchResultPageValue" @item-clicked="changeLoadSearchResultPageValue" />
    </q-drawer>

    <q-page-container>
      <div class="q-ma-md" v-if="checkLoggedInAdmin">
        <router-view/>
      </div>
      <div v-else class="pages-background-image whole-page">
        <search-result-page v-if="loadSearchResultPage" :p-search-text="searchText" @view-product="view" @clear-filters="clearSearchText"/>
        <router-view v-else />
      </div>
    </q-page-container>

  </q-layout>
</template>
<script>
import LeftDrawerContent from "components/main-layout/LeftDrawerContent.vue";
import {useSecurityStore} from "stores/securityStore";
import {useCartStore} from "stores/cartStore";
import SearchResultPage from "pages/SearchResultPage.vue";
import userClient from "src/lib/api-clients/user-client";

export default {
  components: {SearchResultPage, LeftDrawerContent},
  data() {
    return {
      showChangePasswordDialog: false,
      leftDrawerOpen: false,
      securityStore: useSecurityStore(),
      cartStore: useCartStore(),
      useClient: userClient,
      searchText: null,
      loadSearchResultPage: false,
      breadcrumbs: null,
    }
  },
  computed: {
    checkLoggedInUser() {
      return this.securityStore.user !== null;
    },
    checkIfUserHasImage() {
      return this.securityStore.user.image !== undefined;
    },
    checkLoggedInAdmin() {
      return this.securityStore.role === 'ROLE_ADMIN';
    },
  },
  created() {
    this.createBreadcrumbs();
  },
  methods: {
    async search() {
      if (!this.loadSearchResultPage) {
        this.loadSearchResultPage = true;
      } else {
        this.loadSearchResultPage = false;
        await new Promise(r => setTimeout(r, 2));
        this.loadSearchResultPage = true;
      }
    },
    view(routerPushValues) {
      this.loadSearchResultPage = routerPushValues.loadSearchResultPage;
      this.$router.push({
        path: routerPushValues.path,
        query: routerPushValues.query
      });
    },
    clearSearchText() {
      this.searchText = "";
    },
    changeLoadSearchResultPageValue() {
      this.loadSearchResultPage = false;
    },
    returnOnHomePage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/",
      });
    },
    userProfilePage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/user-profile",
      });
    },
    purchaseHistoryPage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/purchase-history",
      });
    },
    manufacturersPage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/manufacturers",
      });
    },
    onSalePage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/on-sale",
      });
    },
    newProductsPage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/new-products",
      });
    },
    popularProductsPage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/popular-products",
      });
    },
    shoppingCartPage() {
      this.loadSearchResultPage = false;
      this.$router.push({
        path: "/shopping-cart-page",
      });
    },
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
      this.loadSearchResultPage = false;
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
    login() {
      this.useClient.login();
    },
    register() {
      this.$router.push({
        path: "/login-register",
      });
    },
    logout() {
      // Srediti api client i celu aplikaciju u slucaju kada korisnik nije loginovan i srediti da ne ucita da li je korisnik kupio product
      this.loadSearchResultPage = false;
      this.cleanUp();
      this.securityStore.keycloak.redirectUri = "http://localhost:9000/";
      this.securityStore.keycloak.logout();
    },
  },

}
</script>
