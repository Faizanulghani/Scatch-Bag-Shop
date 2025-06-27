let express = require("express");
let app = express();
let cookieParser = require("cookie-parser")
let path = require("path")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')
app.get("/", (req, res) => {
  res.send("Work");
});

app.listen(3000);
