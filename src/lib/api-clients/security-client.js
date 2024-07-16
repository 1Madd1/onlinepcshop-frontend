import axios from "axios";

const securityClient = {

  changePassword: function(newPassword) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.ROOT_API_URL}/user/change-password`,
        {
          newPassword: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(
          response => resolve(response),
          error => reject(error.response.data)
        )
    })
  }

}

export default securityClient;
