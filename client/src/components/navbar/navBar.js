import React,{useEffect, useState} from 'react'
import s from "./navBar.module.css"
import {Link} from "react-router-dom"
import { filterByDiet, getDiets, getRecipes, orderAlpha } from '../../redux/actions'
// import { useDispatch,useSelector } from 'react-redux'
import logo from "../../media/images/logo.png"
import magnifyingglass from "../../media/images/lupa.png"
import { connect } from 'react-redux'

export function NavBar({diets,getDiets,getRecipes,filterByDiet,orderAlpha,setOrder,setCurrentPage}) {
    // const dispatch = useDispatch()
    // const allDiets = useSelector(state=> state.diets)

  
    const allDiets = diets
    useEffect( ()=>{
    //   dispatch(getDiets())
      getDiets()
    },[])
  
  
    const resetRecipes = (e)=>{
      e.preventDefault()
    //   dispatch(getRecipes())
      getRecipes()
    }

    const handleFilteredDiets = (e)=>{
        filterByDiet(e.target.value)
    }

    const handleOrderAlpha = (e)=>{
        e.preventDefault()
        orderAlpha(e.target.value)
        setCurrentPage(1)
        setOrder(`${e.target.value}`)
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
                <select onChange={(e)=>handleOrderAlpha(e)}>
                    <option value="Default">Default</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
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
                <select onChange={(e)=>handleFilteredDiets(e)}>
                    <option value="All">All</option>
                {allDiets && allDiets.map(e=>(
                    <option value={e.name} key={e.id} >{e.name}</option>
                ))}
                </select>
            </div>
        </div>

    </div>
  )
}

function mapStateToProps(state){
    return {
        diets: state.diets
    }
}

function mapDispatchToProps(dispatch){
    return {
        getDiets: function () {dispatch(getDiets())},
        getRecipes: recipes => dispatch(getRecipes()),
        filterByDiet: diet => dispatch(filterByDiet(diet)),
        orderAlpha: alpha => dispatch(orderAlpha(alpha))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)