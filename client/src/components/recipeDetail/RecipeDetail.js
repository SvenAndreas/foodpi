import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link, useParams} from 'react-router-dom'
import { cleanDetails, deleteRecipe, getDiets, getRecipeById, updateRecipe} from '../../redux/actions'
import s from "./RecipeDetail.module.css"
import food from "../../media/images/food.gif"
import {validateUpdate} from "../../utils/validateUpdate.js"

function RecipeDetail(props) {

  const [diets, setDiets]= useState([])
  const [msg, setMsg] = useState({success:"",error:""})
  const [errors, setErrors] = useState({})

  
  const details = useSelector(state=> state.recipeDetails)
  const allDiets = useSelector(state=>state.diets)
  const dispatch = useDispatch()
  const {id} = useParams()

 useEffect(()=>{
 dispatch(getRecipeById(id))
 dispatch(getDiets())
 return ()=>dispatch(cleanDetails())
},[])


const [input, setInput] = useState({
  name:"",
  healthScore:"",
  diets:[],
  summary:"",
  analyzedInstructions:"",
  readyInMinutes:"",
  dishTypes:"",
  image:""
})

const initialState ={
  name:"",
  healthScore:"",
  diets:[],
  summary:"",
  analyzedInstructions:"",
  readyInMinutes:"",
  dishTypes:"",
  image:""
}

  const summaryToHtml = ()=>{
     return{__html:details.summary}
  }

  const handleDelete = ()=>{
    dispatch(deleteRecipe(details.id))
    setMsg(msg => ({...msg,success:"Recipe deleted successfully"}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,success:""}))
          props.history.push("/home")
        },1300)
  }

  const handleSelect= (e)=>{
    const checked = e.target.checked
    const value = e.target.value
    // console.log(value)
    if(checked){
      diets.push(value)
      setInput(prev=> ({...prev,diets:diets}))
      console.log(diets)
    }else{
      diets.pop()
      setInput(prev=> ({...prev,diets:diets}))
      // setDiets(diets)
    }
  }

  const handleInput = (e)=>{
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
    setErrors(validateUpdate({...input,[e.target.name]:e.target.value}))
  }

  

  const handleCancel = (e)=>{
    e.preventDefault()
    const check = document.getElementById("display");
    const displayed = document.getElementById("displayed")
    const form = document.getElementById("form")
    if(check.checked){
      check.checked = false
      displayed.style.visibility="hidden"
      displayed.style.opacity="0"
      form.style.scale="0.1"
    }else{
      check.checked = true
      displayed.style.visibility="visible"
      displayed.style.opacity="1"
      form.style.scale="1"
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      if(errors.name || errors.dishTypes || errors.image || errors.readyInMinutes || errors.healthScore){
        setMsg(msg => ({...msg,error:"🚨Modify fields"}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,error:""}))
        },3000)
        return}
        else if(input.name.length <= 0 && input.dishTypes.length <= 0 && input.image.length <= 0 && input.readyInMinutes.length <= 0 && input.healthScore.length <= 0 && input.diets.length <= 0){
          setMsg(msg=> ({...msg,error:"No updates registered press cancel"}))
          setTimeout(()=>{
            setMsg(msg=>({...msg,error:""}))
          },3000)
          return
      }else{
        dispatch(updateRecipe(input,id))
        setInput(initialState)
        // .then(r=> dispatch(getRecipeById(id)))
        setTimeout(()=>{
          dispatch(getRecipeById(id))
        },500)
        document.querySelectorAll("input[type='checkbox']").forEach(e=> e.checked = false)
        
        document.getElementById("display").checked = false;
        document.getElementById("displayed").style.visibility="hidden"
        document.getElementById("displayed").style.opacity="0"
        document.getElementById("form").style.scale="0.1"

        setMsg(msg => ({...msg,success:"Successfully modified😊"}))
        setDiets([])
        setTimeout(()=>{
          setMsg(msg=>({...msg,success:""}))
        },3000)
      }
    }catch(e){
      setMsg(msg => ({...msg,error:e.message}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,error:""}))
        },3000)
    }
  }

  return Object.keys(details).length > 0
  ? (
    <div className={s.container}>

      <input className={s.display_input} type="checkbox" id="display"/>
      
      <div id="displayed" className={s.container_update}>

        <form id="form" className={s.container_update_form}>

          <div className={s.container_update_title}>
              <h2>Update Recipe</h2>
          </div>

          <div className={s.container_update_form_info}>

            <div className={s.container_update_inputs}>

              <div className={s.container_update_inputs_sub}>
                <label>Name:</label>
                <input onChange={handleInput} value={input.name}  autoComplete="off" name="name" placeholder='Enter a name...'/>
                {errors.name ? <p>{errors.name}</p> : null}
              </div>
              <div className={s.container_update_inputs_sub}>
                <label>Health score:</label>
                <input onChange={handleInput} value={input.healthScore} autoComplete="off" name="healthScore" placeholder="Enter health score..."/>
                {errors.healthScore ? <p>{errors.healthScore}</p> : null}
              </div>
              <div className={s.container_update_inputs_sub}>
                <label>Ready in minutes:</label>
                <input onChange={handleInput} value={input.readyInMinutes} autoComplete="off" name="readyInMinutes" placeholder='Enter minutes...' />
                {errors.readyInMinutes ? <p>{errors.readyInMinutes}</p> : null}
              </div>
              <div className={s.container_update_inputs_sub}>
                <label>Dish types:</label>
                <input onChange={handleInput} value={input.dishTypes} autoComplete="off" name="dishTypes"/>
                {errors.dishTypes ? <p>{errors.dishTypes}</p> : null}
              </div>
              <div className={s.container_update_inputs_sub}>
                <label>Image:</label>
                <input onChange={handleInput} value={input.image} autoComplete="off" name="image"/>
                {errors.image ? <p>{errors.image}</p> : null}
              </div>
              
              <label>Summary:</label>
              <textarea onChange={handleInput} value={input.summary} autoComplete="off" name="summary"/>

              <label>Analyzed instructions:</label>
              <textarea onChange={handleInput} value={input.analyzedInstructions} autoComplete="off" name="analyzedInstructions"/>
             
            </div>
          
            <div className={s.container_update_form_diets}>
              <label className={s.container_update_form_diets_label}>Diets:</label>
            {allDiets && allDiets.map(e=>{  
                return( 
                        <div key={e.name} className={s.checkBox_container}>
                          <label className={s.checkBox_label} htmlFor={e.name}>{e.name}</label>
                          <input onChange={(e)=>handleSelect(e)} name="diets" type="checkbox" id={e.name} value={e.name} />
                        </div>
                    )
                  }
                )
            }
              <div className={s.container_update_form_buttons}>
                <button onClick={handleCancel}>Cancel</button>  
                <button onClick={handleSubmit}>Update</button>
              </div>
              {msg ? <p className={s.update_msg_err}>{msg.error}</p> : null }
            </div>

          </div>

        </form>
      </div>
      
        

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
              <button onClick={handleCancel}>Update</button>
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
            <p>{details.diets.join(" - ")}</p>
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
  : (
    <div className={s.loadingContainer}>
      <img src={food} alt="loading gif"/>
      <h3>Loading...</h3>
    </div>
  )
}

export default RecipeDetail