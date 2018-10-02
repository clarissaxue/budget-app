const plaid = require("plaid");
const url = (module.exports = require("url"));
require("dotenv").config();

//Create Plaid client
let plaidClient = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);

const exchangePublicToken = (request, response, next) => {
  let urlObj = url.parse(request.url, true);
  let publicToken = urlObj.query.publicToken;
  console.log(publicToken);
  plaidClient.exchangePublicToken(publicToken, (error, tokenResponse) => {
    if (error != null) {
      console.log(
        "Could not exchange public_token!" + "\n" + JSON.stringify(error)
      );
      return response.status(error.status_code).send(JSON.stringify(error));
    }
    console.log("Access Token: " + tokenResponse.access_token);
    console.log("Item ID: " + tokenResponse.item_id);
    return response.status(200).send(tokenResponse.access_token);
  });
};

const getAccounts = (request, response) => {
  let urlObj = url.parse(request.url, true);
  let accessToken = urlObj.query.accessToken;
  console.log(accessToken);
  if (accessToken) {
    plaidClient.getAccounts(accessToken).then(res => {
      console.log("Accounts: " + JSON.stringify(res.accounts));
      return response.status(200).send(res.accounts);
    });
  } else {
    return response.status(400).send("Bad request");
  }
};

module.exports = {
  exchangePublicToken,
  getAccounts
};
