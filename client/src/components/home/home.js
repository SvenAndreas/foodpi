import {React,useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getRecipes } from '../../redux/actions'
import RecipeCard from '../recipeCard/recipeCard'
import { Link } from 'react-router-dom'
import s from "./home.module.css"
import NavBar from '../navbar/navBar'
import Paginate from '../paginate/paginate'

function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector(state=> state.recipes)

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage,setRecipesPerPage] = useState(9)
    const [order , setOrder] = useState("")

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
    console.log(typeof currentRecipes)
    const paginate = (pageNumber)=>{
      setCurrentPage(pageNumber)
    }

    const goFoward = ()=>{
      if(currentPage < Math.floor(allRecipes.length/recipesPerPage))
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
        <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />

        <div className={
          typeof currentRecipes === "string" 
          ? s.paginateContainer_notFound 
          : s.paginateContainer}>

          {typeof currentRecipes === "string" ? null :
            <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate} goFoward={goFoward} goBackWards={goBackWards}/>
          }  

        </div>

        
        <div className={s.cardContainer}>
          <div className={s.cardContainer_recipeCard}>
            {
            !currentRecipes 
            ? <h1>Loading..</h1>
            : typeof currentRecipes === "string" ? <p className={s.notFound}>Recipe not found</p> : currentRecipes.map(e=>{
                return <Link key={e.id} to={`/details/${e.id}`}> <RecipeCard key={e.id} id={e.id} diets={e.diets || e.Diets.map(e=>e.name)}  name={e.name} healthScore={e.healthScore} image={e.image}/></Link>
               })
            
            }
          </div>
        </div>

    </div>
  )
}

export default Home