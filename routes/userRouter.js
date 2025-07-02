let express = require("express");
const { registerUser } = require("../controllers/authController");
let router = express.Router();

router.get("/", async (req, res) => {
  res.send("hey it's working");
});

router.post("/register", registerUser);

module.exports = router;
