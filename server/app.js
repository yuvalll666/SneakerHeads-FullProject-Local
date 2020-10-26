const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/user");
const jwt = require("jsonwebtoken")

// "mongodb+srv://yuval:Aza315569533@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority"

mongoose
  .connect(
    "mongodb+srv://yuval:Aza315569533@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not conncet to mongoDB"));

app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

app.get("/confirmation/:token", async (req, res) => {
console.log("kkkkkkkkaaaaaaaaaaa")

try {
  console.log("kkkkkkkkaaaaaaaaaaa")
    const data = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    console.log("data:", data);
    if (data) {
      await User.findOneAndUpdate({ _id: data._id }, { confirmed: true });
      //  (user, { confirmed: true });
    }
  } catch (e) {
    console.log(e)
    res.send("Error");
  }

  return res.redirect("http://localhost:3000/signin");
});

const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
