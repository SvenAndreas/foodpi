import React from 'react'
import { Link } from 'react-router-dom'
import s from "./recipeCard.module.css"

function RecipeCard({id,healthScore,name,image,diets}) {


  return (
    
      <div className={s.container }>
        <img src={image} alt={name} />
        <h4>{name}</h4>

        <div className={s.container_info}>
          <p>Health Score: {healthScore}</p>
          <p>Diets: {diets.join(" - ")}</p>
        </div>
        
        <Link  className={s.link}to={`/details/${id}`}>
           Click here for more details...
        </Link>

      </div>
    
  )
}

export default RecipeCard