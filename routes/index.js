let express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
let router = express.Router();
let productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to Cart");
  res.redirect("/shop");
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});
router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email:req.user.email}).populate("cart")
  res.render("cart",{user});
});

module.exports = router;
