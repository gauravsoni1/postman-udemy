const express = require("express");
const router = express.Router();
const path = require("path");
const { randomBytes } = require("crypto");
const { getUsers, updateUser } = require("../commons");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const Users = getUsers();
  //Read the auth headers
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized!");
  } else {
    authHeader = authHeader.split(" ")[1];
    try {
      const isValidToken = jwt.verify(authHeader, "thisisasecret");
    } catch (error) {
      return res.status(400).send("Invalid auth headers");
    }
  }

  //Check if the user is signed in
  let authenticatedUser = Users.find((user) => {
    if (user.token === authHeader) {
      console.log("the user is ", user);      
      return user;
    }
  });

  if (authenticatedUser) {
    res.status(200).send(authenticatedUser.orders);
  } else {
    res.status(401).send("User not signed in");
  }
});

router.post("/", (req, res) => {
  const Users = getUsers();
  //Read the auth headers
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized!");
  } else {
    authHeader = authHeader.split(" ")[1];
    try {
      const isValidToken = jwt.verify(authHeader, "thisisasecret");
    } catch (error) {
      return res.status(400).send("Invalid auth headers");
    }
  }

  //Check if the user is signed in
  let authenticatedUser = Users.find((user) => {
    if (user.token === authHeader) {
      console.log("the user is ", user);
      user.orders = req.body;
      updateUser(user);
      return user;
    }
  });

  if (authenticatedUser){
    return res.status(201).send(authenticatedUser.orders);
  }else{
    return res.status(401).send("Not signed in");
  }
  
});

module.exports = router;
