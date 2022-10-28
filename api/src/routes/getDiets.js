const { Router } = require('express');
const {getDiets} = require("../controllers/getDbData")

const router = Router()

router.get("/diets", async(req,res)=>{
    try{
        const diets = await getDiets()
        console.log(diets)
        res.json(diets)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router