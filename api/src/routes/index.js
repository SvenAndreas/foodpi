const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY} = process.env
// console.log(API_KEY)
// console.log(process.env)
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiRecipes = async ()=>{
    try{
        const recipes = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const data1 = await recipes.json()
        console.log(data1)
        const data = await data1.map(e=>{
            return {
                id: e.id,
                name: e.title,
                summary: e.summary,
                healthScore : e.healthScore,
            }
        })
        console.log(data)
        return data
    }catch(e){
        console.log(e)
        return e
    }
}
apiRecipes()

// const dbRecipes = async () => {
//     try{
//         const recipes = await fetch()
//     }catch(e){
//         console.log(e)
//         return e
//     }
// }

module.exports = router;
