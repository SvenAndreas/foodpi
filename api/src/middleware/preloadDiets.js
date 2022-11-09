const { Router } = require('express');
const router = Router();
const {Diet} = require("../db.js")

router.use(async (req,res,next)=>{
    const diets =["Gluten free","Ketogenic","Lacto ovo Vegetarian","Dairy free","Vegan","Pescatarian","Paleolithic","Primal","Fodmap friendly","Whole 30"]
    const dbDiets = diets.map(e=> Diet.findOrCreate({ 
        where:{
            name:e
        }
    }))
    // await Promise.all(dbDiets)
    next()
})


module.exports = router