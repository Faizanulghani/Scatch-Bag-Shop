let express = require("express");

let app = express();

app.get("/", (req, res) => {
  res.send("Work");
});

app.listen(3000);
