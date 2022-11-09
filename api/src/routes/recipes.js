const { Router } = require('express');
const mergeData = require("../controllers/mergeData.js")
const {apiRecipesById} = require("../controllers/getApiData")
const {Recipe,Diet} = require("../db.js")
const router = Router();
const {dbRecipeById} = require("../controllers/getDbData.js")


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
    console.log(id)
    try{
        const details = await apiRecipesById(id)
        console.log(details)
        if(details === "There are not recipes with that id in the API"){
            const getRecipes = await dbRecipeById(id)
            console.log(getRecipes)
            getRecipes.length > 0 
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

module.exports = router