let express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
let router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
