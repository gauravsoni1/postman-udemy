const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config");

//Routes
const SearchRouter = require("./routes/search");
const {router: UserRouter} = require("./routes/user");
const ProductRouter = require("./routes/product");
const OrderRouter = require("./routes/order");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/search", SearchRouter);
app.use("/users", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(config.PORT, () => {
  console.log(
    `Ecommerce server running in env = ${config.NODE_ENV} and on port = ${config.PORT}`
  );
});
