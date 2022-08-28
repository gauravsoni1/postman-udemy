const fs = require("fs");

const serverCofig = JSON.parse(fs.readFileSync(process.env.NODE_ENV + ".json"), { encoding: "utf-8" });

module.exports = serverCofig;