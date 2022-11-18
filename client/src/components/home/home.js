import {React,useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getRecipes } from '../../redux/actions'
import RecipeCard from '../recipeCard/RecipeCard'
import s from "./home.module.css"
import NavBar from '../navbar/NavBar'
import Paginate from '../paginate/Paginate'
import food from "../../media/images/food.gif"


function Home() {
    const dispatch = useDispatch()
    const recipes = useSelector(state=> state.recipes)
    const allRecipes = useSelector(state=> state.allRecipes)
    const loading = useSelector(state=>state.loading)

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage,setRecipesPerPage] = useState(9)
    const [order , setOrder] = useState("")

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
    console.log(typeof currentRecipes)
    const paginate = (pageNumber)=>{
      setCurrentPage(pageNumber)
    }

    const goFoward = ()=>{
      if(currentPage < Math.floor(recipes.length/recipesPerPage))
      setCurrentPage(currentPage => currentPage+1)
    }

    const goBackWards = ()=>{
      if (currentPage > 1)
      setCurrentPage(currentPage=> currentPage-1)
    }


    useEffect( ()=>{
      dispatch(getRecipes())
    },[])

  
  return (
    <div className={s.container}>
        <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} recipes={recipes} allRecipes={allRecipes} />

        {recipes.length > 0 && !loading
        ?(
        <>
          <div className={
            typeof currentRecipes === "string" 
            ? s.paginateContainer_notFound 
            : s.paginateContainer}>
  
            {typeof currentRecipes === "string" ? null :
              <Paginate recipesPerPage={recipesPerPage} allRecipes={recipes.length} paginate={paginate} goFoward={goFoward} goBackWards={goBackWards}/>
            }  
  
          </div>
  
          
          <div className={s.cardContainer}>
            <div className={s.cardContainer_recipeCard}>
              {
              !currentRecipes 
              ? <h1>Loading..</h1>
              : typeof currentRecipes === "string" ? <p className={s.notFound}>Recipe not found</p> : currentRecipes.map(e=>{
                  return (
                      <RecipeCard key={e.id} id={e.id} diets={e.diets || e.Diets.map(e=>e.name)}  name={e.name} healthScore={e.healthScore} image={e.image}/>
              )})
              
              }
            </div>
          </div>
        </>
        )
      :(
      <div className={s.loadingContainer}>
        <img src={food} alt="loading gif"/>
        <h3>Loading...</h3>
      </div>)
      }
       


    </div>
  )
}

export default Home