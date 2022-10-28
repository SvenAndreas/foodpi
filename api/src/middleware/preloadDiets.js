const { Router } = require('express');
const router = Router();
const {Diet} = require("../db.js")

router.use(async (req,res,next)=>{
    const diets =["Gluten free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"]
    const dbDiets = diets.map(e=> Diet.findOrCreate({ 
        where:{
            name:e
        }
    }))
    // await Promise.all(dbDiets)
    next()
})


module.exports = router