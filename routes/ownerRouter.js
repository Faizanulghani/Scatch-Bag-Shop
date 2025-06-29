let express = require("express");
let router = express.Router();
let ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hey it's working");
});

if (process.env.NODE_ENV == "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.lengtn > 0) {
      return res
        .status(500)
        .send("You don't have permission to create a new owner");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

module.exports = router;
