const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const game = require("./routes/game");
const history = require("./routes/history");

app.use(game);
app.use(history);

const { Game, Biodata, History } = require("./models");
app.get("/", async (_, res) => {
  const data = await Game.findAll({
    include: [History],
  });
  res.json(data);
});

app.listen(8000);