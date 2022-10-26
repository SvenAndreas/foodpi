const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiRecipes = async ()=>{
    const recipes = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`)
}

module.exports = router;
