let userModel = require("../models/user-model");
let bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser){
      req.flash("error", "You Already created Account, please login");
      return res.redirect("/");
    }

    let hash = await bcrypt.hash(password, 10);
    let newUser = await userModel.create({
      fullname,
      email,
      password: hash,
    });

    let token = generateToken(newUser);
    res.cookie("token", token);
    res.send("user created successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let findUser = await userModel.findOne({ email });
  if (!findUser) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

  bcrypt.compare(password, findUser.password, (err, result) => {
    if (result) {
      let token = generateToken(findUser);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
