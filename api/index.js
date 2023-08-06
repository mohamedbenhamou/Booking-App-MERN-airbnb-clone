const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config();




const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);



app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const userDoc = await User.create({
    username,
    password: bcrypt.hashSync(password, bcryptSalt),
    email,
  });
  res.json(userDoc);
});

app.listen(4000);
