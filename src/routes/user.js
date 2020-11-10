const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.status(400).send("Invalid route");
});

router.post("/", (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);
  if (!reqBody.username || !reqBody.password) {
    return res.status(400).send("Invalid signup details");
  }
  const userId = uuidv4();
  let resData = {
    username: reqBody.username,
    id: userId,
  };
  if (req.headers['show-headers']) {
    resData.headers = req.headers;
  } 
  res.cookie("testcookie","some cookie value");
  res.status(201).send(resData);
});

module.exports = router;
