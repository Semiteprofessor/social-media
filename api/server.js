require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db-connection");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const helpers = require("./util/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT;

const hbs = exphbs.create({ helpers });

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const sessionOptions = {
  secret: "new_secret",
  resave: false,
  saveUninitialized: false,
  cookies: {
    maxAge: ONE_MINUTE * 5,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.get("/", (req, res) => res.send("Hello World!"));

// Handlebars configuration
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sessionOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
// app.use(routes)

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`listening to server on http://localhost:${PORT}`)
  );
});
