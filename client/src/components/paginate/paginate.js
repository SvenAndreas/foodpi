import React from "react";
import s from "./paginate.module.css";

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
    <nav className={s.navContainer}>
      {!allRecipes ? (
        <h1>loading</h1>
      ) : (
        <div>
          <button onClick={() => goBackWards()}> {"<"}</button>
          {pageNumbers &&
            pageNumbers.map((e) => (
              <button key={e} onClick={() => paginate(e)}>{e}</button>
            ))}
          <button onClick={() => goFoward()}>{">"}</button>
        </div>
      )}
    </nav>
  );
}

export default Paginate;
