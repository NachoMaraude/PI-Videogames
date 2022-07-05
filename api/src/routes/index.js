const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesV = require("./videogames");
const genreR = require("./genre");
const videogameV = require("./videogame");
const platformsS = require("./platforms");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesV);
router.use("/genre", genreR);
router.use("/videogame", videogameV);
router.use("/platforms", platformsS);

module.exports = router;
