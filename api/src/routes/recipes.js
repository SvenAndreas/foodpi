const { Router } = require('express');
const mergeData = require("../controllers/mergeData.js")
const {apiRecipesById} = require("../controllers/getApiData")
const {Recipe} = require("../db.js")
const router = Router();


router.get("/recipes", async (req,res)=>{
    const {name} = req.query;
    try{
        let totalRecipes = await mergeData();
        if (name){
            const recipeByName = await totalRecipes
            const filterdRecipes = await recipeByName.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
            filterdRecipes.length
            ? res.json(filterdRecipes)
            : res.status(404).send("Recipe not found")
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
    try{
        const details = await apiRecipesById(id)
        console.log(details)
        res.json(details)
    }catch(e){
        res.status(404).send(e.message)
    }
})


router.post("/recipes", async(req,res)=>{
    const {name,summary,healthScore,analyzedInstructions,readyInMinutes,dishTypes,diets} = req.body
    try{
        
        if(!name || !summary || !healthScore || !analyzedInstructions || !readyInMinutes || !dishTypes || !diets) throw new Error("Missing data")
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            analyzedInstructions,
            readyInMinutes,
            dishTypes,
            diets
        })
        res.json(newRecipe)
    }catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = router