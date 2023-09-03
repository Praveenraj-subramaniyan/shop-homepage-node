var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const card = require("../models/card");
const user = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();


router.get('/',async function(req, res, next) {
    const auth_token = req.headers.authorization.split(' ')[1];
    try {
        var response = await AuthorizeUser(auth_token);
        if (response === false) {
          res.status(200).send("login");
        } else if(response === true) {
          var cardItems = await card.find().lean();
          res.json(cardItems);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("login");
      }
});

async function AuthorizeUser(token) {
    try {
      const decodedToken = jwt.verify(token, process.env.login_Secret_Token);
      if (decodedToken) {
        const email = decodedToken.email;
        const userCheck = await user.findOne({ email: email });
        if(userCheck)
        {
            return true; 
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

module.exports = router;
