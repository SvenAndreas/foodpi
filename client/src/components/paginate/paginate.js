import React from 'react'
import s from "./paginate.module.css"

function Paginate({recipesPerPage, allRecipes, paginate,goFoward,goBackWards}) {
    const pageNumbers= []

    for(let i = 0 ; i <= Math.floor(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

  return (
    <nav className={s.navContainer}>
        <button onClick={()=>goBackWards()}> {"<"}</button>
        {pageNumbers && pageNumbers.map(e=>(
                <button onClick={()=>paginate(e)}>{e}</button>
                ))}
        <button onClick={()=>goFoward()}>{">"}</button>
    </nav>
  )
}

export default Paginate