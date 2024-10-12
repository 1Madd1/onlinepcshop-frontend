import {Notify} from "quasar";
import axios from "axios";

const instance  = axios.create({
  baseURL: `${process.env.ROOT_API_URL}`,
});

const apiClient = {

  request: async function(httpMethod, url, params, payload) {
    // console.log(localStorage.getItem("auth_token"));
    try {
      payload = JSON.stringify(payload);
      const response = await instance.request({
        method: httpMethod,
        data: payload,
        url,
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

      return response.data;
    } catch (error) {
      //if(Object.prototype.hasOwnProperty.call(error.response.data, "errorMessage")){
        Notify.create({
          type: 'negative',
          message: error.response.data.errorMessage
        });
      /*} else {
        Notify.create({
          type: 'negative',
          message: "Something went wrong!"
        });*/
    }
  }
}

export default apiClient;
