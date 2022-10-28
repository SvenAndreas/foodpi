const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRecipes = require("./recipes")
const preloadDiets = require("../middleware/preloadDiets")
const getDiets = require("./diets")
const router = Router();


router.use(preloadDiets)
router.use(getDiets)
router.use(getRecipes)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
