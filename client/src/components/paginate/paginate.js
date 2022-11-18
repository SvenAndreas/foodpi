import React from "react";
import s from "./paginate.module.css";
import food from "../../media/images/food.gif"

function Paginate({
  recipesPerPage,
  allRecipes,
  paginate,
  goFoward,
  goBackWards,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (  
    <div className={s.paginateContainer}>
      {!allRecipes ? (
        <div className={s.paginateContainer_loading}>
          <img src={food} alt="waiting gif" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className={s.paginateContainer_div}>
          <button onClick={() => goBackWards()}> {"<"}</button>
          {pageNumbers &&
            pageNumbers.map((e) => (
              <button key={e} onClick={() => paginate(e)}>{e}</button>
            ))}
          <button onClick={() => goFoward()}>{">"}</button>
        </div>
      )}
    </div>
  );
}

export default Paginate;
