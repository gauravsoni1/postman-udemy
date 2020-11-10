const express = require("express");
const router = express.Router();
const path = require("path");
const { randomBytes } = require("crypto");

const product = {};

router.get("/:productid", (req, res) => {
  res.sendFile(path.join(__dirname + "/partials/product.html"));
});

router.get("/details/:productid", (req, res) => {
  const prdId = req.params.productid;

  let response = product[prdId];

  if (!response) {
    return res.send(404).send({});
  }

  res.send(response);
});

router.post("/", (req, res) => {
  let { title, price, description } = req.body;
  console.log(req.body);

  //Read the auth headers
  let authHeader = req.headers.authorization;
  authHeader = authHeader.split(" ")[1];

  //Decode the Base64 values and convert to utf-8
  const decodedAuthHeader = Buffer.from(authHeader, "base64").toString("utf-8");

  //Check if the title and price are sent in the request
  if (!title || !price) {
    return res.status(400).send("Invalid data");
  }
  //Assign the values to variables
  const [username, password] = decodedAuthHeader.split(":");
  if (username === "username" && password === "postman") {
    const id = randomBytes(4).toString("hex");
    product[id] = { title, price, description };
    return res.status(201).send({ title, price, id });
  } else {
    res.status(401).send("Unauthorised Request");
  }
});

module.exports = router;
