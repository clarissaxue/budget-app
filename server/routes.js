const express = require("express");
const plaid = require("./plaid");

const router = express.Router();

router.route("/exchangePublicToken").get(plaid.exchangePublicToken);
router.route("/getAccounts").get(plaid.getAccounts);

module.exports = router;
