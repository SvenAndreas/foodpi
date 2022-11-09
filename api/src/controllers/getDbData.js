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
        console.log("ESTO ES",recipe[0].dataValues.summary)
        // return recipe
        return{
            name:recipe[0].dataValues.name,
            summary:recipe[0].dataValues.summary,
            image: recipe[0].dataValues.image,
            summary: recipe[0].dataValues.summary,
            healthScore: recipe[0].dataValues.healthScore,
            // cuisines: recipe[0].datavalues.cuisines[0]
            //   ? recipe[0].datavalues.cuisines.map((e) => e)
            //   : "There are no cuisines to show",
            readyInMinutes: recipe[0].dataValues.readyInMinutes,
            dishTypes: recipe[0].dataValues.dishTypes,
            analyzedInstructions: recipe[0].dataValues.analyzedInstructions,
            diets: recipe[0].dataValues.Diets
              ? await recipe[0].dataValues.Diets.map((e) => e.name)
              : "There are no diets to show",
          };
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