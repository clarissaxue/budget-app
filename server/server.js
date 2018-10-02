const express = require("express");
const bodyparser = require("body-parser");
const router = require("./routes");

const PORT = 3000;

//Create express app
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Use router middleware to connect different api route calls
app.use("/api", router);

//Listens to given port
app.listen(PORT, () => {
  console.log("Listening on PORT:" + PORT);
});
