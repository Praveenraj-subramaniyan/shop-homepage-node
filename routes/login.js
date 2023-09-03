var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async function (req, res, next) {
  try {
    const { email, password } = await req.body;
    var reponse = await AuthenticateUser(email, password);
    console.log(reponse)
    if (reponse === false) {
      res.status(200).send(false);
    } else {
      res.status(200).send(reponse);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(false);
  }
});

async function AuthenticateUser(email, password) {
  try {
    const userCheck = await user.findOne({ email: email });
    if (password == userCheck.password) {
      const token = jwt.sign({ email: email }, process.env.login_Secret_Token);
      return token;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = router;
