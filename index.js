const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

// local strategy
const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

// jwt
const jwtPassport = require("./lib/jwtPassport");
app.use(jwtPassport.initialize());

app.use(flash());

app.set("view engine", "ejs");

const restrict = require("./middlewares/restrict");
const apiRestrict = require("./middlewares/apiRestrict");

const game = require("./routes/game");
const history = require("./routes/history");
const biodata = require("./routes/biodata");
const auth = require("./routes/auth");

app.use(game);
app.use(history);
app.use("/biodata", restrict, biodata);
app.use(auth);

const { Game, Biodata, History } = require("./models");
app.get("/", apiRestrict, async (_, res) => {
  const data = await Game.findAll({
    include: [Biodata, History],
  });
  res.json(data);
});

app.get("/whoami", apiRestrict, (req, res) => {
  res.json(req.user);
});

app.get("/api/games", async (req, res) => {
  const offset = req.query.page ? (req.query.page - 1) * 2 : 0;
  // page=1 = offset 0
  // page=2 = offset 2
  console.log("offset", offset);

  const games = await Game.findAll({
    include: [Biodata],
    offset,
    limit: 2,
  });

  res.json(games);
});

app.listen(3000, () => {
  console.log("Your apps running in http://localhost:3000/ ...");
});