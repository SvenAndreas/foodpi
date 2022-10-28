const {Diet} = require("../db.js")
console.log(Diet)
// const generateDiets = ()=>{
//     try{
//         const diets = ["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","pescetarian","paleo","primal","low fodmap","whole30"]
//         const generate = diets.map(async (e)=>{
//                 await Diet.create({
//                 name: e
//             })
//         })
//     }catch(e){
//         return e
//     }
// }
const diet = await Diet.create({
    name: "vegan"
})

// generateDiets()