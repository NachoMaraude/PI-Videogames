require("dotenv").config();
const { Router } = require("express");
const db = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const apiPlatforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const allPlatforms = apiPlatforms.data.results.map((e) => e.name);
    // const allPlatforms = await Videogame.findAll({ attributes: ["platforms"] });
    res.status(200).json(allPlatforms);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
