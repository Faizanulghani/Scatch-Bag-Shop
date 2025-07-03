let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let path = require("path");
let expressSession = require("express-session");
let flash = require("connect-flash");

let userRouter = require("./routes/userRouter");
let ownerRouter = require("./routes/ownerRouter");
let productRouter = require("./routes/productRouter");
let indexRouter = require("./routes/index");
require("dotenv").config();

let db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash())
app.set("view engine", "ejs");

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/", indexRouter);

app.listen(3000);
