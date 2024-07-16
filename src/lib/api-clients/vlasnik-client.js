import axios from "axios";

const vlasnikClient = {

  addVlasnik: function (vlasnik) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.ROOT_API_URL}/vlasnik`, vlasnik,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(
          response => resolve(response.data),
          error => reject(error.response.data)
        );
    });
  },

  updateVlasnik: function(vlasnik) {
    return new Promise((resolve,reject) => {
      axios.put(`${process.env.ROOT_API_URL}/vlasnik`, vlasnik,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(
          response => resolve(response.data),
          error => reject(error.response.data)
        );
    });
  },

  getAllVlasnici: function (page = 0, rowsPerPage = 5, sortBy = 'ime', descending = false, filter = null) {
    let imeFilter = "";
    let brojIspraveFilter = "";
    if (filter !== null) {
      imeFilter = filter.ime !== null && filter.ime !== "" ? `&ime=${filter.ime}` : "";
      if (typeof filter.brojIsprave !== "undefined") {
        brojIspraveFilter = filter.brojIsprave !== null && filter.brojIsprave !== "" ? `&brojIsprave=${filter.brojIsprave}` : "";
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.ROOT_API_URL}/vlasnik?page=${page}&rows-per-page=${rowsPerPage}&sort-by=${sortBy}&descending=${descending}`
        + `${imeFilter}${brojIspraveFilter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(
          response => resolve(response.data),
          error => reject(error.response.data)
        );
    });
  },

  getById: function (vlasnikId) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.ROOT_API_URL}/vlasnik/${vlasnikId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(
          response => resolve(response.data),
          error => reject(error.response.data)
        )
    })
  },

  getLoggedVlasnik() {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.ROOT_API_URL}/vlasnik/logged-in`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        }).then(
        response => resolve(response.data),
        error => reject(error.response.data)
      )
    })
  }

}

export default vlasnikClient;
