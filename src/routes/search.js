const { query } = require('express');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.send("Enter some item to search");
});

router.get('/:item',(req,res)=>{
  const queryParams = req.query ;
  const urlParams = req.params.item;
  const queryParamsExist = Object.keys(queryParams).length > 0;
  let response = {};
  queryParamsExist ? response.queryParams = queryParams : null;
  urlParams ? response.urlParams = urlParams : null;

  console.log(`URL Parameters -- ${JSON.stringify(req.params)}`);
  if (queryParamsExist){
    console.log("Query params --",queryParams);
  }

  res.send(response);
});

module.exports = router;