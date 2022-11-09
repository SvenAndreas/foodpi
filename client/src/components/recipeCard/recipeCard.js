import React from 'react'
import s from "./recipeCard.module.css"

function RecipeCard({id,healthScore,name,image,diets}) {
  return (
    <div className={s.container}>
      
      <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Health Score: {healthScore}</p>
        <p>Diets: {diets}</p>
    </div>
  )
}

export default RecipeCard