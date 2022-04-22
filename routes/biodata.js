const router = require("express").Router();

const req = require("express/lib/request");
const { Game, Biodata, History } = require("../models");

router.get("/", async (_, res) => {
  const games = await Game.findAll({
    include: [Biodata],
  });

  res.render("biodata", {
    games,
  });
});

// ADD DATA
router.get("/add", async (_, res) => {
  res.render("biodata/form", {
    game: null,
    urlPost: "/biodata/post",
  });
});

router.post("/post", async (req, res) => {
  const game = await Game.create({
    username: req.body.username,
    password: req.body.password,
  });

  await Biodata.create({
    name: req.body.name,
    hobby: req.body.hobby,
    game_id: game.id,
  });

  res.redirect("/biodata");

  // Game.create({
  //   username: req.body.username,
  //   password: req.body.password,
  // }).then((game) => {
  //   if (!req.body.name) {
  //     res.redirect("/biodata");
  //   }

  //   Biodata.create({
  //     name: req.body.name,
  //     hobby: req.body.hobby,
  //     game_id: game.id,
  //   }).then(() => {
  //     History.create({
  //       playedAt: Date.now(),
  //       score: req.body.score,
  //       game_id: game.id,
  //     }).then(() => {
  //       res.redirect("/biodata");
  //     });
  //   });
  // });
});

// DETAIL
router.get("/:id", async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: +req.params.id,
    },
    include: [Biodata, History],
  });

  // res.json(game);

  res.render("biodata/detail", {
    game,
  });
});

// UPDATE DATA
router.get("/edit/:id", async (req, res) => {
  const game = await Game.findOne({
    where: {
      id: +req.params.id,
    },
    include: [Biodata],
  });

  res.render("biodata/form", {
    game: game,
    urlPost: `/biodata/update/${game.id}`,
  });
});

router.post("/update/:gameId", (req, res) => {
  Game.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: {
        id: +req.params.gameId,
      },
    }
  ).then(() => {
    Biodata.findOne({
      where: {
        game_id: +req.params.gameId,
      },
    }).then((biodata) => {
      // object | null

      if (biodata) {
        Biodata.update(
          {
            name: req.body.name,
            hobby: req.body.hobby,
          },
          {
            where: {
              game_id: +req.params.gameId,
            },
          }
        ).then(() => {
          res.redirect("/biodata");
        });
      } else {
        Biodata.create({
          name: req.body.name,
          hobby: req.body.hobby,
          game_id: +req.params.gameId,
        }).then(() => {
          res.redirect("/biodata");
        });
      }
    });
  });
});

router.get("/delete/:id", async (req, res) => {
  await Game.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/biodata");
});

module.exports = router;