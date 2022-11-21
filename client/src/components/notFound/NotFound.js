import React from 'react'
import notFound from "../../media/images/notFound.jpg"
import s from "./NotFound.module.css"
import {Link} from "react-router-dom"

function NotFound() {
  return (
    <div className={s.container}>
      <div className={s.container_titleBtn}>
        <h1>Error 404 not found</h1>  
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <img src={notFound} alt="notfound"></img>
    </div>
  )
}

export default NotFound