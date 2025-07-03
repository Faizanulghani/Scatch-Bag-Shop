let express = require("express");
const upload = require("../config/multer-config");
let router = express.Router()
let productModel = require("../models/product-model");

router.post('/create',upload.single("image"), async (req,res)=>{
  let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body
try {
  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor
  })
  req.flash("success","Your Product Added Successfully")
  res.redirect("/owners/admin")
} catch (error) {
  res.send(error)
}
  
})

module.exports = router