const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash")
const Handlebars = require("handlebars")
const helpers = require("./utils/hbsHelpers")
const app = express();

//Env variables

dotenv.config();

//Initilaize session store
const store = new MongoStore({
  collection: "sessions",
  uri: process.env.MONGO_URI,
});

helpers(Handlebars)

//Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(flash())

//Body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set static folder

app.use(express.static(path.join(__dirname, "public")));

//Initialize template engine (Handlebars)

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

//Initialize routes

app.use("/", require("./routes/homeRoutes"));
app.use("/about", require("./routes/aboutRoutes"));
// app.use("/services", require("./routes/servicesRoutes"));
app.use("/blog", require("./routes/blogRoutes"));
app.use("/contact", require("./routes/contactRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/test", require("./routes/testRoutes"))

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  console.log(`Mongodb connected`)
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
