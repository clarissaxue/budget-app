import axios from "axios";
const uri = "http://localhost:3000";

const exchangePublicToken = publicToken => {
  let url =
    uri + "/exchangeAccessToken?publicToken=" + encodeURIComponent(publicToken);
  return axios.get(url).then(response => {
    console.log(response.data);
  });
};

const getAccounts = accessToken => {
  let url = uri + "/getAccounts?accessToken=" + encodeURIComponent(accessToken);
  return axios.get(url).then(response => {
    console.log(response.data);
  });
};

module.exports = {
  exchangePublicToken,
  getAccounts
};
