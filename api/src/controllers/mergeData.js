const {apiRecipes} = require("./getApiData")
const {dbRecipes} = require("./getDbData")


const mergeData = async ()=>{
    try{
        let apiGet = await apiRecipes()
        let dbGet = await dbRecipes()
        let mergeData = apiGet.concat(dbGet)
        // console.log(mergeData)
        return mergeData
    }catch(e){
        return e
    }
}

module.exports = mergeData;