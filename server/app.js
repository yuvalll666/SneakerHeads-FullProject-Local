const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");


// "mongodb+srv://yuval:Aza315569533@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority"

mongoose
  .connect("mongodb+srv://yuval:Aza315569533@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not conncet to mongoDB"));

app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
