const { Router } = require("express");
const db = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    await apiGenres.data.results.forEach((el) => {
      Genre.findOrCreate({
        where: {
          name: el.name,
        },
      });
    });
    // const allGenres = await Genre.findAll({ attributes: ["name"] });
    const allGenres = apiGenres.data.results.map((e) => e.name);
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
