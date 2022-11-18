export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const FILTER_ALPHA = "FILTER_BY_ALPHA"
export const FILTER_BY_HEALTHSCORE = "FILTER_BY_HEALTHSCORE"
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID"
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME"
export const SET_LOADING = "SET_LOADING"


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
    console.log(payload)
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

export const orderHealthScore = (payload) => {
    return async function(dispatch){
        return dispatch({
            type: FILTER_BY_HEALTHSCORE,
            payload
        })
    }

}

export const getRecipeById = (payload)=>{
    console.log(payload)
    return async function (dispatch){
       const recipe = await fetch(`http://localhost:3001/recipes/${payload}`)
       const data = await recipe.json()
       console.log("esto es json",data)
       return dispatch({
                type: GET_RECIPES_BY_ID,
                payload: data
            })
    }
}

export const searchByName = (payload)=>{
    return async function(dispatch){
        try{
            const recipe = await fetch(`http://localhost:3001/recipes?name=${payload}`)
            const data = await recipe.json();
            console.log(data)
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload:data
            })
        }catch(e){
           console.log(e)
    }
  }
}


export const postRecipe = (payload) =>{
    return async function (dispatch){
        try{
           await fetch("http://localhost:3001/recipes",{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
        }catch(e){
            return e.message
        }
    }
}

export const deleteRecipe = (payload)=>{
    return async function (dispatch){
        try{
            fetch(`http://localhost:3001/recipes/${payload}`,{
                    method: "DELETE"
                })
        }
        catch(e){
            return e.message
        }
    }
}

export const setLoading = ()=>{
    return async function(dispatch){
        return dispatch({
            type: SET_LOADING
        })
    }
}