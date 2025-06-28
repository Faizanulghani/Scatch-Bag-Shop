let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("hey it's working");
});

module.exports = router;
