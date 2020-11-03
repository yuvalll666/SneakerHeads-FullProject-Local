const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/user");
const jwt = require("jsonwebtoken");

// Connect to atlas mongoDB
mongoose
  .connect(
    `mongodb+srv://yuval:${process.env.MONGO_PASSWORD}@onlineshop.abqhu.mongodb.net/online-shop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not conncet to mongoDB"));

// Allow access from diffrent ports
app.use(cors());
// Watch for server changes
app.use(require("morgan")("dev"));
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/products", require("./routes/products"));

// Updates user to confiremed user
app.get("/confirmation/:token", async (req, res) => {
  try {
    // Verify EMAIL_SECRET exists in token
    const data = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    if (data) {
      // Update user
      await User.findOneAndUpdate({ _id: data._id }, { confirmed: true });
      // Redirect to confirmation page
      return res.redirect("http://localhost:3000/confirmation");
    } else {
      return res.send("Error");
    }
  } catch (e) {
    return res.send({ error: e });
  }
});

// Listen on port 3900
const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
