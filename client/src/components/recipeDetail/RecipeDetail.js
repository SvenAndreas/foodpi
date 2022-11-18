import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link, useParams} from 'react-router-dom'
import { deleteRecipe, getRecipeById } from '../../redux/actions'
import s from "./RecipeDetail.module.css"

function RecipeDetail(props) {

  const [msg, setMsg] = useState({success:""})
  
  const details = useSelector(state=> state.recipeDetails)
  const dispatch = useDispatch()
  const {id} = useParams()
 useEffect(()=>dispatch(getRecipeById(id))
 ,[])
 
  const summaryToHtml = ()=>{
     return{__html:details.summary}
  }

  const handleDelete = ()=>{
    dispatch(deleteRecipe(details.id))
    setMsg(msg => ({...msg,success:"Recipe deleted successfully"}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,success:""}))
          props.history.push("/home")
        },2000)
  }

  return (
    <div className={s.container}>
      <div className={s.container_button}>
          <Link to="/home">
            <button>Go back</button>
          </Link>

          {msg 
          ?<div className={ s.container_button_p }>
            <p>{msg.success}</p>
          </div>
          :<div></div>}

            {details.isFromDB 
            ?<div className={s.container_button_db}>
              <button onClick={handleDelete}>Delete</button>
              <button>Update</button>
             </div>
            :null }
      </div>

      <div className={s.container_sub}>

        <div className={s.container_sub_image}>
          <img src={details.image} alt={details.name} />
        </div>

        <div>

          <div className={s.container_sub_name}>
           <h4>{details.name}</h4>
          </div>
          
          <div className={s.container_sub_details}>
            <p>Health Score:</p>
            <p>{details.healthScore}</p>
          </div>

          <div className={s.container_sub_details}>
            <p>Ready in minutes:</p>
            <p>{details.readyInMinutes}</p>
          </div>

          <div className={s.container_sub_details}>
            <p>Diets:</p>
            <p>{details.diets}</p>
          </div>

          <div className={s.container_sub_details}>
            <p>Dish types:</p>
            <p>{details.dishTypes}</p>
          </div>

        </div>

      </div>

      <div className={s.container_sub_inst_summ}>

        <div className={s.container_sub_desc}>
            <p className={s.container_sub_p_title}>Summary</p>
            <p dangerouslySetInnerHTML={summaryToHtml()}></p>
        </div>

        <div className={s.container_sub_desc}>
          <p className={s.container_sub_p_title}>Intructions</p>
          <p>{details.analyzedInstructions}</p>
        </div>

      </div>

    </div>
  )
}

export default RecipeDetail