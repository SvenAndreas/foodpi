const { Router } = require('express');
const mergeData = require("../controllers/mergeData.js")
const {apiRecipesById} = require("../controllers/getApiData")
const {Recipe,Diet} = require("../db.js")
const router = Router();
const {dbRecipeById} = require("../controllers/getDbData.js");
const {Op} = require("sequelize")


router.get("/recipes", async (req,res)=>{
    const {name} = req.query;
    try{
        let totalRecipes = await mergeData();
        if (name){
            const recipeByName = await totalRecipes
            // console.log(recipeByName)
            const filterdRecipes = await recipeByName.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
            filterdRecipes.length
            ? res.json(filterdRecipes)
            : res.status(404).json("Recipe not found")
        }else{
             return res.json(totalRecipes)
        }
    }catch(e){
        console.log(e)
        res.status(404).send(e.message)
    }
})


router.get("/recipes/:id", async(req,res)=>{
    const id = req.params.id
    // console.log(id)
    try{
        const details = await apiRecipesById(id)
        console.log(details)
        if(details === "There are not recipes with that id in the API"){
            const getRecipes = await dbRecipeById(id)
            console.log(getRecipes)
            getRecipes
            ? res.json(getRecipes)
            : res.status(400).send("There are no recipes with that id in DB")
        }else res.json(details)
    }catch(e){
        res.status(404).send(e)
    }
})


router.post("/recipes", async(req,res)=>{
    const {name,summary,healthScore,analyzedInstructions,readyInMinutes,dishTypes,diets,image} = req.body
    try{
        if(!name || !summary || !healthScore || !analyzedInstructions || !readyInMinutes || !dishTypes || !diets || !image) throw new Error("Missing data")
        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            analyzedInstructions,
            readyInMinutes,
            dishTypes,
            image
        })
        const dietsDb = await Diet.findAll({
            where:{
                name : diets
            }
        })
        
        newRecipe.addDiet(dietsDb)
        // console.log(newRecipe)
        
        res.json(newRecipe)
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.delete("/recipes/:id", async(req,res)=>{
    const id = req.params.id
    // console.log(id)
    try{
       const deleted = await Recipe.findByPk(id)
       await Recipe.destroy({
        where:{
            id: id
        }
       })
       res.json(`Recipe ${deleted.name} was deleted successfully`)
    }catch(e){
        res.status(404).send(e)
    }
})

router.put("/recipes/:id", async(req,res)=>{
    const id = req.params.id
    const {name,summary,healthScore,analyzedInstructions,readyInMinutes,dishTypes,diets,image} = req.body
    try{
        console.log(diets)
        if(diets.length > 0){
            const recipe = await Recipe.findAll({
             where:{id},
             include:{
                 model:Diet,
                 attributes:["id"],
                 through:{
                     attributes:[]
                 }
             }
            })
             const removedDietsId = (recipe[0].dataValues.Diets.map(e=> e.dataValues.id))
             const modified = await Recipe.findByPk(id)
             await modified.removeDiets(removedDietsId)
             const dietsDb = await Diet.findAll({
                 where:{
                     name : diets
                 }
             })
             
            await modified.addDiet(dietsDb)
        }

        const recipeBeforeUpdate = await Recipe.findByPk(id)

        await Recipe.update({
            name: name.length > 0 ? name : recipeBeforeUpdate.name ,
            summary:summary.length > 0 ? summary : recipeBeforeUpdate.summary,
            healthScore:Number(healthScore) > 0 ? Number(healthScore): recipeBeforeUpdate.healthScore,
            analyzedInstructions: analyzedInstructions.length > 0 ? analyzedInstructions : recipeBeforeUpdate.analyzedInstructions,
            readyInMinutes:Number(readyInMinutes) > 0 ? Number(readyInMinutes) : recipeBeforeUpdate.readyInMinutes,
            dishTypes: dishTypes.length > 0 ? dishTypes : recipeBeforeUpdate.dishTypes,
            image: image.length > 0 ? image : recipeBeforeUpdate.image
        },{
            where:{
                id: id
            }
        })
        
       
       res.json(`Recipe was successfully updated`)
    }catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})

module.exports = router