const {Recipe} = require("../db.js")
const {Diet} = require("../db.js")

const dbRecipes = async ()=>{
    try{
        const recipes = await Recipe.findAll({
            includes: Diet
        }
        )
        // if(recipes.length === 0) throw new Error("There are not recipes in DB")
        // console.log(recipes)
        return recipes
    }catch(e){
        // console.log(e.message)
        return e.message
    }
}

module.exports = dbRecipes