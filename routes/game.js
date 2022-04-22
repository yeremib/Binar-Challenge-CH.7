const express = require("express");
const router = require("express").Router();

const { Game } = require("../models");

router.get("/games", async (_, res) => {
  res.status(200).json(await Game.findAll());
});

router.post("/game", async (req, res) => {
  const game = await Game.create({
    username: req.body.user_name,
    password: req.body.pass,
  });

  res.status(201).json(game);
});

router.put("/game/:id", async (req, res) => {
// router.put("/game", async (req, res) => {
  const game = await Game.update({
    username: req.body.user_name,
    password: req.body.pass,
  }, {
    where: {
      id: req.params.id
      // id: req.body.id
    }
  });

  res.status(204).json();
});

router.delete("/game", async (req, res) => {
  const game = await Game.destroy({
    where: {
      id: req.body.id,
    }
  })

  res.status(204).json();
});

module.exports = router;