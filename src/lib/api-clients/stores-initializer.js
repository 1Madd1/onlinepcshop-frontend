import {useSecurityStore} from "stores/securityStore";
import apiClient from "src/lib/api-clients/api-client";

const initializer = {

  initializeSecurityStore: async function (keycloak) {
    return new Promise(async (resolve, reject) => {
      const securityStore = useSecurityStore();
      securityStore.setKeycloak(keycloak);
      const jwtAsJson = JSON.parse(atob(localStorage.getItem("auth_token").split(".")[1]));
      securityStore.setRole(jwtAsJson.roles[0])
      if (securityStore.role === "ROLE_USER") {
        const user = await apiClient.request('get', '/user/me', null, null);
        securityStore.setUser(user);
        resolve(user);
      } else if (securityStore.role === "ROLE_ADMIN") {
        resolve({admin: true});
      }
    })
  },

}

export default initializer;
