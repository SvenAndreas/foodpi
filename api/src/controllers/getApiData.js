require("dotenv").config();
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiRecipes = async () => {
  try {
    const recipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    if (recipes.data.results.length > 0) {
      const data = await recipes.data.results.map((e) => {
        return {
          id: e.id,
          name: e.title,
          image: e.image,
          summary: e.summary,
          healthScore: e.healthScore,
          diets:e.diets,
          analyzedInstructions:
            e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
              ? e.analyzedInstructions[0].steps.map(
                  (steps, index) => index + 1 + " step: " + steps.step
                )
              : "There are no instructions to show",
        };
      });
      // console.log(data)
      return data;
    } 
  } catch (e) {
    console.log(e.message);
    return e;
  }
};

const apiRecipesById = async (id) => {
  // console.log(id)
  try {
    const recipes = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    // console.log(recipes.data.title)
    if (Object.keys(recipes.data).length > 0) {
      return {
        id:recipes.data.id,
        name: recipes.data.title,
        image: recipes.data.image,
        summary: recipes.data.summary,
        healthScore: recipes.data.healthScore,
        cuisines: recipes.data.cuisines[0]
          ? recipes.data.cuisines.map((e) => e)
          : "There are no cuisines to show",
        readyInMinutes: recipes.data.readyInMinutes,
        dishTypes: recipes.data.dishTypes[0]
          ? recipes.data.dishTypes.map((e) => e)
          : "There are no dish types to show",
        analyzedInstructions:
          recipes.data.analyzedInstructions[0] &&
          recipes.data.analyzedInstructions[0].steps
            ? recipes.data.analyzedInstructions[0].steps.map(
                (steps, index) => index + 1 + " step: " + steps.step
              )
            : "There are no instructions to show",
        diets: recipes.data.diets
          ? await recipes.data.diets.map((e) => e)
          : "There are no diets to show",
      };
    } else {
      return "API problem: No data in the API with this ID."
    }
  } catch (e) {

    return "There are not recipes with that id in the API";
  }
};

module.exports = { apiRecipes, apiRecipesById };
