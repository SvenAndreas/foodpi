import React from 'react'
import s from "./paginate.module.css"

function Paginate({recipesPerPage, allRecipes, paginate,goFoward,goBackWards}) {
    const pageNumbers= []

    for(let i = 1 ; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
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