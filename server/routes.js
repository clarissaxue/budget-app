const express = require("express");
const plaid = require("./api/plaid");

const router = express.Router();

router.route("/api/exchangePublicToken").get(plaid.exchangePublicToken);
router.route("/api/getAccounts").get(plaid.getAccounts);

module.exports = router;
