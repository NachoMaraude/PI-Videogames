require("dotenv").config();
const { Router } = require("express");
const db = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { getAllVideogames } = require("./functions");

const router = Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      const videogamesDb = await Videogame.findOne({
        where: { id: id },
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      const videogameN = {
        ...videogamesDb.dataValues,
        genres: videogamesDb.genres?.map((e) => e.name),
      };
      if (videogameN) return res.status(200).json(videogameN);
    }
    const info = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const game = {
      id: info.data.id,
      name: info.data.name,
      description: info.data.description,
      released: info.data.released,
      genres: info.data.genres.map((e) => e.name),
      rating: info.data.rating,
      platforms: info.data.platforms.map((e) => e.platform.name),
      image: info.data.background_image,
    };
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    genres,
    rating,
    platforms,
    createdInDb,
  } = req.body;
  try {
    const genresDb = await Videogame.create(req.body);
    genres?.map(async (e) => {
      const genreId = await Genre.findAll({ where: { name: e } });
      genresDb.addGenre(genreId);
    });
    res.status(201).json("Videogame created");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
