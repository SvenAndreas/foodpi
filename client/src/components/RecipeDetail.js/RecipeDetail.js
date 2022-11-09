import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../../redux/actions'

function RecipeDetail() {
  const details = useSelector(state=> state.recipeDetails)
  const dispatch = useDispatch()
  const {id} = useParams()
  console.log(details)
 useEffect(()=>{
    dispatch(getRecipeById(id))
    }
 ,[])
  return (
    <div>
        <h4>{details.name || details[0].name}</h4>
        <img src={details.image || details[0].image} alt={details.name || details[0].name} />

        <div>
            <p>Health Score:</p>
            <p>{details.healthScore || details[0].healthScore}</p>
        </div>

        <div>
            <p>Summary:</p>
            <p>{details.summary || details[0].summary}</p>
        </div>

        <div>
            <p>Ready in minutes</p>
            <p>{details.readyInMinutes || details[0].readyInMinutes}</p>
        </div>

        <div>
         <p>Diets:</p>
         <p>{details.diets || details[0].diets}</p>
        </div>

        <div>
            <p>Dish types:</p>
            <p>{details.dishTypes || details[0].dishTypes}</p>
        </div>


        <div>
          <p>Intructions</p>
          <p>{details.analyzedInstructions || details[0].analyzedInstructions}</p>
        </div>


    </div>
  )
}

export default RecipeDetail