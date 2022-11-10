import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { getRecipeById } from '../../redux/actions'

function RecipeDetail() {
  const details = useSelector(state=> state.recipeDetails)
  const dispatch = useDispatch()
  const {id} = useParams()
 useEffect(()=>dispatch(getRecipeById(id))
 ,[])

  const summaryToHtml = ()=>{
     return{__html:details.summary}
  }

  return (
    <div>
        <Link to="/home">
          <button>Go back</button>
        </Link>
        
        <img src={details.image} alt={details.name} />
        <h4>{details.name}</h4>
        <div>
            <p>Health Score:</p>
            <p>{details.healthScore}</p>
        </div>

        <div>
            <p>Summary:</p>
            <p dangerouslySetInnerHTML={summaryToHtml()}></p>
        </div>

        <div>
            <p>Ready in minutes</p>
            <p>{details.readyInMinutes}</p>
        </div>

        <div>
         <p>Diets:</p>
         <p>{details.diets}</p>
        </div>

        <div>
            <p>Dish types:</p>
            <p>{details.dishTypes}</p>
        </div>


        <div>
          <p>Intructions</p>
          <p>{details.analyzedInstructions}</p>
        </div>


    </div>
  )
}

export default RecipeDetail