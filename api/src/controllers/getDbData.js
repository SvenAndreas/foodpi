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
            },
        }
        )
      
        return recipes
    }catch(e){
        // console.log(e.message)
        return e.message
    }
}

const dbRecipeById = async (id)=>{
    try{
        const recipe = await Recipe.findAll({
            where:{id},
            include:{
                model:Diet,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            },
        }
        )
      
        return recipe
    }catch(e){
        // console.log(e.message)
        return e.message
    }
}

const getDiets = async()=>{
    try{
        const diets = await Diet.findAll()
        // console.log(diets)
        return diets
    }catch(e){
        return e
    }
}


module.exports = {dbRecipes,getDiets,dbRecipeById}