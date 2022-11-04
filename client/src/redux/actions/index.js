export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS"

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