const fs = require("fs");
const path = require("path");

const serverCofig = JSON.parse(fs.readFileSync(path.resolve(__dirname + `/../${process.env.NODE_ENV}` + ".json"), { encoding: "utf-8" }));

module.exports = serverCofig;