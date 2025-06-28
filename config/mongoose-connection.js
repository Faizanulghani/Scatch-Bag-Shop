const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://root:root@scatch.drkh4hu.mongodb.net/scatch?retryWrites=true&w=majority&appName=Scatch"
).then(()=>{
  console.log("Connected");
})
.catch((err)=>{
  console.log(err);
})

module.exports = mongoose.connection