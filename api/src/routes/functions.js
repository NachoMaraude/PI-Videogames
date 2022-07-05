const db = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

getApiInfo = async () => {
  let page1 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1`
  );
  let page2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  let page3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  let page4 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  let page5 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );
  page1 = page1.data.results;
  page2 = page2.data.results;
  page3 = page3.data.results;
  page4 = page4.data.results;
  page5 = page5.data.results;
  let apiInfo = page1.concat(page2).concat(page3).concat(page4).concat(page5);
  const videogameDetail = await apiInfo.map((e) => {
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      released: e.released,
      genres: e.genres.map((e) => e.name),
      rating: e.rating,
      platforms: e.platforms.map((e) => e.platform.name),
      image: e.background_image,
    };
  });
  return videogameDetail;
};

getDbInfo = async () => {
  let videogame = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let videogames = videogame.map((e) => {
    return {
      ...e.dataValues,
      genre: e.genre?.map((e) => e.name),
    };
  });
  return videogames;
};

getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo); //  primero aparece la info de la api
  //  const infoTotal = dbInfo.concat(apiInfo); // primero aparece la info de la base de datos
  return infoTotal;
};

module.exports = { getAllVideogames };
