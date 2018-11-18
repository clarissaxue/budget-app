import axios from "axios";
const uri = "http://localhost:3000";

const getAccessToken = publicToken => {
  const url =
    uri +
    "/api/exchangePublicToken?publicToken=" +
    encodeURIComponent(publicToken);
  return axios
    .get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error(error);
    });
};

const getAccounts = accessToken => {
  const url =
    uri + "/api/getAccounts?accessToken=" + encodeURIComponent(accessToken);
  return axios
    .get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error(error);
    });
};

module.exports = {
  getAccessToken,
  getAccounts
};
