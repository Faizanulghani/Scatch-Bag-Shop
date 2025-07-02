let userModel = require("../models/user-model");
let bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    let user = userModel.findOne({ email: email });
    if (user) return res.send("You Already created Account, please login");

    bcrypt.genSalt(10, (req, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("user created successfully");
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
