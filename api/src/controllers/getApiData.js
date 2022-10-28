require('dotenv').config();
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const API_KEY = "032bd816560e4955bd5d3bb65972b7fa"
const {API_KEY} = process.env


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiRecipes = async ()=>{
    try{
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`)
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
         throw new Error("There is no data")   
        }
    }catch(e){
        console.log(e.message)
        return e
    }
}

module.exports = apiRecipes;