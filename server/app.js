const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/online-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not conncet to mongoDB"));

const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
