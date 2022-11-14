import React,{ useState,useEffect  } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getDiets, postRecipe } from '../../redux/actions'
import s from "./CreateRecipe.module.css"
import {validate} from "../../utils/validate"
import { Link } from 'react-router-dom'

function CreateRecipe() {
  
 const [diets,setDiets] = useState([])
 const [msg, setMsg] = useState({error:"",success:""})
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
 console.log(input.diets.length)

 const errorsIntialState = {
  name: "*Name is required",
  healthScore: "*Health score is required",
  analyzedInstructions: "*Instructions are required",
  summary: "*Summary is required",
  diets: "*Select a diet",
  readyInMinutes:"*Mintues are required",
  dishTypes:"*Dish type is required",
  image:"*URL image is required"
}

 const [errors, setErrors] = useState(errorsIntialState)



 const allDiets = useSelector(state=> state.diets)
 const dispatch = useDispatch()

 useEffect(()=>{
  dispatch(getDiets())
},[])

  // console.log(input)
  const handleInput=(e)=>{
    setInput(prev=> ({...prev,[e.target.name]:e.target.value}))
    setErrors(validate({...input,[e.target.name]:e.target.value}))
  }
  
  const handleSelect= (e)=>{
    const checked = e.target.checked
    const value = e.target.value
    console.log(errors)
    if(checked){
      diets.push(value)
      // setInput(prev=> ({...prev,diets:[...input.diets,value]}))
      setInput(prev=> ({...prev,diets:diets}))
      setErrors(validate({...input,diets:value}))
      console.log(diets)
    }else{
      diets.pop()
      setDiets(diets => diets)
      setInput(prev=> ({...prev,diets:diets}))
      // setInput(prev=> ({...prev,diets:input.diets.filter(e=> e !== value)}))
      setErrors(validate(input))
      console.log(diets)
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      if(errors.name || errors.summary || errors.diets || errors.dishTypes ||errors.image || errors.readyInMinutes || errors.analyzedInstructions || errors.healthScore){
        setMsg(msg => ({...msg,error:"🚨Required fields can't be empty "}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,error:""}))
        },3000)
        return
      }else{
        dispatch(postRecipe(input))
        setMsg(msg => ({...msg,success:"New recipe uploaded 😊"}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,success:""}))
        },3000)
      }
    }catch(e){
      setMsg(msg => ({...msg,error:"Error while uploading : try again 🚨"}))
        setTimeout(()=>{
          setMsg(msg=>({...msg,error:""}))
        },3000)
    }
  }

  return ( 
    <div className={s.container}>
    <form className={s.form_container}>

        <div className={s.form_container_name}>
         <Link to="/home">
          <button className={s.btn_name}>Home</button>
         </Link>
         <h3>Create Recipe</h3>
        </div>

        <div className={s.form_container_div}>
          <label className={s.label} htmlFor='name'>Recipe name:</label>
          <input autoComplete='off' onChange={(e)=>handleInput(e)} name='name'id='name' value={input.name} placeholder="Enter name..." className={!errors.name ? s.ok : s.form_container_div_input}></input>
          {errors.name ? <p>{errors.name}</p> : null}
        </div>
        
        
        <div className={s.form_container_div}>
          <label className={s.label}  htmlFor='healthScore'>Health Score:</label>
          <input autoComplete='off' onChange={(e)=>handleInput(e)} id="healthScore" name="healthScore" value={input.healthScore} placeholder="Enter health score..." className={!errors.healthScore ? s.ok : s.form_container_div_input}></input>
          {errors.healthScore ? <p>{errors.healthScore}</p> : null}
        </div>
        
        

        <div className={s.form_container_div}>
          <label className={s.label} htmlFor='readyInMinutes'>Ready in minutes:</label>
          <input autoComplete='off' onChange={(e)=>handleInput(e)} id="readyInMinutes" name='readyInMinutes' value={input.readyInMinutes} placeholder="Enter minutes.."  className={!errors.readyInMinutes? s.ok : s.form_container_div_input}/>
          {errors.readyInMinutes ? <p>{errors.readyInMinutes}</p> : null}
        </div>
        


        <label className={s.diets_label}>Select diets:</label>
        <div className={s.diets_container}>
          {/* <label>Select diet:</label>
          <select onChange={(e)=>handleInput(e)} name="diets" className={errors.diets ? s.danger : s.ok}>
            <option value="select">Select</option>
            {allDiets && allDiets.map(e=>
              <option value={e.diets} key={e.id} >{e.name}</option>)
              }
          </select> */}
          
          {allDiets && allDiets.map(e=>{
            return( 
            <div className={s.checkBox_container}>
              <label className={s.checkBox_label} htmlFor={e.name}>{e.name}</label>
              <input onChange={(e)=>handleSelect(e)} name="diets" type="checkbox" id={e.name} value={e.name} />
            </div>)
          })}
          {errors.diets ? <p className={s.errors_diets }>{errors.diets}</p> : null}
        </div>
        

        <div className={s.form_container_div}>
          <label className={s.label} id="dishTypes" htmlFor='dishTypes'>Dish type:</label>
          <input autoComplete='off' onChange={(e)=>handleInput(e)} name='dishTypes' id="dishTypes" value={input.dishTypes} placeholder="Enter dish type..." className={!errors.dishTypes ? s.ok : s.form_container_div_input}/>
          {errors.dishTypes ? <p>{errors.dishTypes}</p> : null}
        </div>
        

        <div className={s.form_container_div}>
          <label className={s.label_textarea} htmlFor='summary'>Summary:</label>
          <textarea autoComplete='off' onChange={(e)=>handleInput(e)} name='summary' id="summary" value={input.summary} placeholder="Enter summary..." className={!errors.summary ? s.ok_textarea : s.form_container_div_textarea}/>
          {errors.summary ? <p>{errors.summary}</p> : null}
        </div>
      


        <div className={s.form_container_div}>
          <label className={s.label_textarea} htmlFor='analyzedInstructions'>Instructions:</label>
          <textarea autoComplete='off' onChange={(e)=>handleInput(e)} id="analyzedInstructions" name='analyzedInstructions' value={input.analyzedInstructions} placeholder="Enter instructions..." className={!errors.analyzedInstructions ? s.ok_textarea : s.form_container_div_textarea}/>
          {errors.analyzedInstructions ? <p>{errors.analyzedInstructions}</p> : null}
        </div>
        

        <div className={s.form_container_div}>
          <label className={s.label} htmlFor='image'>Image URL:</label>
          <input autoComplete='off' onChange={(e)=>handleInput(e)} name="image" id="image" value={input.image}
          placeholder="Insert image URL..." className={!errors.image ? s.ok : s.form_container_div_input}></input>
          {errors.image ? <p>{errors.image}</p> : null}
        </div>
        
        <div className={s.container_msg_upload}>
           {msg ? <h5 className={msg.error ? s.upload_msg_err : s.upload_msg_suc}>{msg.error || msg.success}</h5> : null}
         </div>


        <div className={s.container_buttons}>
          <Link to="/home">
            <button className={s.btn}>Home</button>
          </Link>
          <button className={s.btn} onClick={handleSubmit}type='submit'>Create recipe</button>
        </div>
          
    </form>
    </div>
  )
}

export default CreateRecipe