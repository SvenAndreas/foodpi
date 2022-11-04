import React,{useEffect} from 'react'
import s from "./navBar.module.css"
import {Link} from "react-router-dom"
import { getDiets, getRecipes } from '../../redux/actions'
import { useDispatch,useSelector } from 'react-redux'
import logo from "../../media/images/logo.png"
import magnifyingglass from "../../media/images/lupa.png"

function NavBar() {
    const dispatch = useDispatch()
    const allDiets = useSelector(state=> state.diets)
  
    useEffect( ()=>{
      dispatch(getDiets())
    },[])
  
  
    const resetRecipes = (e)=>{
      e.preventDefault()
      dispatch(getRecipes())
    }
  return (
    <div className={s.navContainer}>

        <div className={s.navContainer_searchBar}>
            <div className={s.navContainer_searchBar_img}>
                <img src={logo} alt="logo" />
            </div>

            <div className={s.navContainer_searchBar_searchInput}>
                <input placeholder='Search...'></input>
                <button>
                    <img src={magnifyingglass} alt="magnifying glass"/>
                    Search
                </button>
            </div>
       </div>

        <div className={s.optionsContainer} >
            <Link to="/createrecipes" className={s.navContainer_link}>
             <button className='navCreate'>Create recipe</button>
            </Link>
            <button onClick={e=> resetRecipes(e)}>Reset recipes</button>
           
            <div className={s.navContainer_options}>
                <p>Order alphabetically:</p>
                <select>
                    <option>A-Z</option>
                    <option>Z-A</option>
                </select>
             </div>

             <div className={s.navContainer_options}>
                <p>Order by health score:</p>
                <select>
                    <option>Highest score</option>
                    <option>Lowest score</option>
                </select>
             </div>

            <div className={s.navContainer_options}>
                <p>Order by diet:</p>
                <select>
                {allDiets && allDiets.map(e=>(
                    <option value={e.name.toLowerCase()} key={e.id}>{e.name}</option>
                ))}
                </select>
            </div>
        </div>

    </div>
  )
}

export default NavBar