const { Router } = require("express");
const db = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { getAllVideogames } = require("./functions");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  try {
    let allVideogames = await getAllVideogames();
    if (name) {
      let videogameName = await allVideogames.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (videogameName.length) res.status(200).json(videogameName);
      else res.status(404).json("Videogame not found");
    } else {
      return res.status(200).json(allVideogames);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
