import { GET_DIETS, GET_RECIPES, FILTER_BY_DIET, FILTER_ALPHA, FILTER_BY_HEALTHSCORE,GET_RECIPE_BY_NAME,GET_RECIPES_BY_ID, SET_LOADING,CLEAN_DETAILS } from "../actions";


const initialState = {
    recipes:[],
    allRecipes:[],
    diets:[],
    recipeDetails:[],
    loading: false
  };
  
function rootReducer (state = initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            // console.log(state.recipes)
            return{
                ...state,
                recipes: action.payload,
                allRecipes:action.payload
            }
        case GET_RECIPE_BY_NAME:
            return{
                ...state,
                recipes: action.payload,
                loading: !state.loading
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
            : allRecipes.filter(e=> 
                e.diets
                ? e.diets.includes(action.payload.toLowerCase())
                : e.Diets.map(e=> e.name.includes(action.payload.toLowerCase()))
            )
            
            return{
                ...state,
                recipes: filtered
            }
        case FILTER_ALPHA:
            console.log(state.allRecipes)
            const alphaRecipes = action.payload === "Default" 
            ? state.allRecipes
            :(
                action.payload === "A-Z"
                ? state.recipes.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase())return 1
                    if(b.name.toLowerCase() > a.name.toLowerCase())return -1 
                    return 0})
                : state.recipes.sort((a,b)=>{
                    if(a.name.toLowerCase() < b.name.toLowerCase())return 1
                    if(b.name.toLowerCase() < a.name.toLowerCase())return -1 
                    return 0
                })
            ) 
            return{
                ...state,
                recipes:action.payload === "Default" ? state.allRecipes : alphaRecipes
            }
        case FILTER_BY_HEALTHSCORE:
            let orderHealthScore = action.payload === "high"
            ? state.recipes.sort((a,b)=>{
                if(a.healthScore < b.healthScore)return 1
                if(b.healthScore < a.healthScore)return -1 
                return 0
            })
            : state.recipes.sort((a,b)=>{
                if(a.healthScore > b.healthScore)return 1
                if(b.healthScore > a.healthScore)return -1 
                return 0})
            return{
                ...state,  
                recipes: orderHealthScore
            }
        case GET_RECIPES_BY_ID:
            return{
                ...state,
                recipeDetails: action.payload
            }
        case SET_LOADING:
            return{
                ...state,
                loading: !state.loading
            }
        case CLEAN_DETAILS:
            return{
                ...state,
                recipeDetails:{}
            }
        default:
            return{
                ...state
            }
    }
  }

  export default rootReducer;