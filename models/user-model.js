const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://root:root@scatch.drkh4hu.mongodb.net/scatch?retryWrites=true&w=majority&appName=Scatch"
);

let userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model('user',userSchema)