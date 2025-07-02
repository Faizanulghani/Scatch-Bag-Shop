let express = require("express");
let router = express.Router();
let userModel = require("../models/user-model");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.send("hey it's working");
});

router.post("/register", async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    bcrypt.genSalt(10,(req,salt)=>{
      bcrypt.hash(password,salt, async (err,hash)=>{
        if(err) return res.send(err.message)
        let user = await userModel.create({
          fullname,
          email,
          password:hash,
        });
        let token = jwt.sign({email,id:user._id},"heyheyhey")
        res.cookie("token",token)
        res.send("user created successfully")
      })
    })
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
