export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const FILTER_ALPHA = "FILTER_BY_ALPHA"
export const FILTER_BY_HEALTHSCORE = "FILTER_BY_HEALTHSCORE"

export const getRecipes = ()=>{
    return async function (dispatch) {
        const recipes = await fetch ("http://localhost:3001/recipes")
        const data = await recipes.json()
        console.log(data)
        return dispatch({
            type:GET_RECIPES,
            payload: data
        })
    }
}

export const getDiets = ()=>{
    return async function (dispatch){
        const diets = await fetch("http://localhost:3001/diets")
        const data = await diets.json()
        console.log(data)
        return dispatch({
            type:GET_DIETS,
            payload: data
        })
    }
}


export const filterByDiet = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: FILTER_BY_DIET,
            payload
        })
    }
}


export const orderAlpha = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: FILTER_ALPHA,
            payload
        })
    }
}