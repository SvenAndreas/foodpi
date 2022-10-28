require('dotenv').config();
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiRecipes = async ()=>{
    try{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        if(recipes.data.results.length > 0){ 
            const data = await recipes.data.results.map(e=>{
                return {
                    id: e.id,
                    name: e.title,
                    summary: e.summary,
                    healthScore : e.healthScore,
                    analyzedInstructions: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps 
                        ? e.analyzedInstructions[0].steps.map((steps,index )=> index+1+" step: " + steps.step)
                        : "There are no instructions to show")
                }
            })
            // console.log(data)
            return data
        } 
        else {
         throw new Error("The API is not working")   
        }
    }catch(e){
        console.log(e.message)
        return e
    }
}

const apiRecipesById = async (id) => {
    try{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        // console.log(recipes.data.title)
        if(Object.keys(recipes.data).length > 0){
            return{
                name : recipes.data.title,
                image: recipes.data.image,
                summary: recipes.data.summary,
                healthScore: recipes.data.healthScore,
                analyzedInstructions: (recipes.data.analyzedInstructions[0] && recipes.data.analyzedInstructions[0].steps 
                    ? recipes.data.analyzedInstructions[0].steps.map((steps,index )=> index+1+" step: " + steps.step)
                    : "There are no instructions to show"),
                diets : (recipes.data.diets
                    ? await recipes.data.diets.map(e=>e)
                    : "There are no diets to show")
            }
        }else{
            throw new Error("The API is not working")
        }

    }catch(e){
        return e
    }
}

module.exports = {apiRecipes, apiRecipesById}