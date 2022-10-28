const getApiData = require("./getApiData")
const getDbData = require("./getDbData")


const mergeData = async ()=>{
    try{
        let apiGet = await getApiData()
        let dbGet = await getDbData()
        let mergeData = apiGet.concat(dbGet)
        // console.log(mergeData)
        return mergeData
    }catch(e){
        return e
    }
}

module.exports = mergeData;