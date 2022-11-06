import { GET_DIETS, GET_RECIPES, FILTER_BY_DIET, FILTER_ALPHA } from "../actions";


const initialState = {
    recipes:[],
    allRecipes:[],
    diets:[],
    loading: false
  };
  
function rootReducer (state = initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes:action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets:action.payload
            }
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            const filtered = action.payload === "All" 
            ? allRecipes
            : allRecipes.filter(e=> e.diets.includes(action.payload.toLowerCase()))
            console.log(action.payload.toLowerCase())
            console.log(filtered)
            return{
                ...state,
                recipes: filtered
            }
        case FILTER_ALPHA:
            // console.log(action.payload)
            let alphaRecipes =[]
            const recipes = state.recipes;
            const all = state.allRecipes
            function order(){
                if(action.payload === "A-Z"){
                    return alphaRecipes = state.recipes.sort((a,b)=>{
                        if(a.name.toLowerCase() > b.name.toLowerCase())return 1
                        if(b.name.toLowerCase() > a.name.toLowerCase())return -1 
                        return 0})
                } else if (action.payload === "Z-A"){
                    return alphaRecipes =
                    state.recipes.sort((a,b)=>{
                        if(a.name.toLowerCase() < b.name.toLowerCase())return 1
                        if(b.name.toLowerCase() < a.name.toLowerCase())return -1 
                        return 0
                    })
                }else if (action.payload=== "Default") {
                    return alphaRecipes = state.allRecipes
                }
            }
           order()
           console.log("recipes",recipes)
           console.log("todas",all)
            // console.log(state.allRecipes)
            // console.log(alphaRecipes)
            return{
                ...state,
                recipes:alphaRecipes
            }
        default:
            return{
                ...state
            }
    }
  }

  export default rootReducer;