import axios from "axios";
import {Notify} from "quasar";
import {keycloak} from "boot/keycloak-init";

const userClient = {

  registerUser: function (user) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.ROOT_API_URL}/user/register`, user)
        .then(
          response => resolve(response.data),
          error => {
            reject(error.response.data);
            Notify.create({
              color: "negative",
              icon: "warning",
              message: error.response.data.errorMessage
            });
          }
        );
    });
  },

  login: function () {
    document.cookie = "kc_auth=starting";
    keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: false,
      redirectUri: `${process.env.ROOT_APP_URL}`
    });
  },


  // getLoggedUser() {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${process.env.ROOT_API_URL}/user/logged-in`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("auth_token")}`
  //         }
  //       }).then(
  //       response => resolve(response.data),
  //       error => reject(error.response.data)
  //     )
  //   })
  // }

}

export default userClient;
