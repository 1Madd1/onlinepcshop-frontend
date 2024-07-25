import {boot} from 'quasar/wrappers'
import Keycloak from "keycloak-js";
import initializer from "src/lib/api-clients/stores-initializer";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

const keycloak = new Keycloak({
  url: `${process.env.ROOT_IDP_URL}/auth`,
  realm: "onlinepcshop-realm",
  clientId: "onlinepcshop-fe-client",
  onLoad: "login-required"
});

export default boot( ({urlPath, router}) => {
  const authToken = document.cookie.split("=")[1];
  if (urlPath.endsWith("home")) {
    return;
  }
  keycloak.init({
    onLoad: "login-required",
    checkLoginIframe: false,
    redirectUri: `${process.env.ROOT_APP_URL}/${urlPath}`
  })
    .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          localStorage.setItem("auth_token", keycloak.token);
          initialize(router, keycloak);
          document.cookie = "token=" + keycloak.token;
          setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
              if (refreshed) {
                localStorage.setItem("auth_token", keycloak.token);
              }
            }).catch(() => {
              console.error("Failed to refresh auth token!");
            });
          }, 60000);

        }
      },
      err => {
        console.log(err);
        console.log(keycloak);
        console.log(localStorage.getItem("auth_token"))
      })
});

export {keycloak}

function initialize(router, keycloak) {
  initializer.initializeSecurityStore(keycloak)
    .then(
      upravnik => {
        // initializer.initializeDrzavaStores();// ok
        // initializer.initializeOpstineStore();
        // initializer.initializeStavkeStore();
        // initializer.initializeUpravniciStore();
        // initializer.initializeStambeneZajedniceStore();
        // initializer.initializeTipPosebnogDelaStore();// ok
        // initializer.initializePartneriStore();
        // initializer.initializeUgovoriStore();
      },
      error => {
        console.error(error);
      }
    );

}

function isUpravnik() {
  let jwtAsJson = JSON.parse(atob(localStorage.getItem("auth_token").split(".")[1]));
  let adminRolesArray = jwtAsJson.roles.filter(r => r === "ROLE_UPRAVNIK");
  return adminRolesArray.length > 0;
}

function isAgent() {
  let jwtAsJson = JSON.parse(atob(localStorage.getItem("auth_token").split(".")[1]));
  let adminRolesArray = jwtAsJson.roles.filter(r => r === "ROLE_AGENT");
  return adminRolesArray.length > 0;
}
