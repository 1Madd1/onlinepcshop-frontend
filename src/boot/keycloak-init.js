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

export default boot( async ({urlPath, router}) => {
  const authToken = document.cookie.split("=")[1];
  if (urlPath.startsWith("/#state=") || localStorage.getItem("auth_token") !== null) {
    await keycloak.init({
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
  }
});

export {keycloak}

function initialize(router, keycloak) {
  initializer.initializeSecurityStore(keycloak)
    .then(
      upravnik => {
      },
      error => {
        console.error(error);
      }
    );

}
