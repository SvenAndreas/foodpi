const { Router, response } = require('express');
const mergeData = require("../controllers/mergeData.js")
const {apiRecipesById} = require("../controllers/getApiData")
const router = Router();

router.get("/recipes", async (req,res)=>{
    const {name} = req.query;
    try{
        let totalRecipes = await mergeData();
        console.log(await totalRecipes.filter(e=>e.name.toLowerCase().includes(name.toLowerCase())))
        if(!totalRecipes) return res.status(404).send("Couldn't get recipes")
        if (name){
            const recipeByName = await totalRecipes.filter(e=>{
              return  e.name.toLowerCase().includes(name.toLowerCase())
            })
            recipeByName.length
            ? res.json(recipeByName)
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

module.exports = router