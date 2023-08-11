const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require('./models/User.js');
const bcryptSalt=bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const jwtSecret='mwojcnonyvdjoicmonqucmdsmopcpmsrciummcos'


mongoose.connect(process.env.MONGO_URL);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);




app.get("/test", (req, res) => {
  res.json("test ok");
});




app.post('/register', async (req,res) => {
  const {username,email,password} = req.body;

  try {
    const userDoc = await User.create({
      username,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});
app.post('/login', async (req,res) => {

  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.listen(4000);