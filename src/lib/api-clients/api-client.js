import {Notify} from "quasar";
import axios from "axios";

const instance  = axios.create({
  baseURL: `${process.env.ROOT_API_URL}`,
});

const apiClient = {

  request: async function(httpMethod, url, params, payload) {
    try {
      let response = null;
      payload = JSON.stringify(payload);
      if (httpMethod === "get") {
        response = await instance.request({
          method: httpMethod,
          data: payload,
          url,
          params: params,
        });
      } else if (url === "/multiple-tables/all-requested-components" || url === "/multiple-tables/purchase-products") {
        response = await instance.request({
          method: httpMethod,
          data: payload,
          url,
          params: params,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      } else if (httpMethod === "login"){
        response = await instance.request({
          method: "get",
          data: payload,
          url,
          params: params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      } else {
        response = await instance.request({
          method: httpMethod,
          data: payload,
          url,
          params: params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      }

      return response.data;
    } catch (error) {
      //if(Object.prototype.hasOwnProperty.call(error.response.data, "errorMessage")){
        Notify.create({
          type: 'negative',
          message: error.response.data.errorMessage
        });
        return null;
      /*} else {
        Notify.create({
          type: 'negative',
          message: "Something went wrong!"
        });*/
    }
  }
}

export default apiClient;
