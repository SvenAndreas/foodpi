const {Recipe} = require("../db.js")
const {Diet} = require("../db.js")

const dbRecipes = async ()=>{
    try{
        const recipes = await Recipe.findAll({
            include:{
                model:Diet,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
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

const getDiets = async()=>{
    try{
        const diets = await Diet.findAll()
        console.log(diets)
        return diets
    }catch(e){
        return e
    }
}


module.exports = {dbRecipes,getDiets}