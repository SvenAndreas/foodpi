import {React} from 'react'
import intro from "../../media/video/intro.mp4"
import s from "./landingPage.module.css"
import music from "../../media/music/musicLanding.mp3"
import { Link } from 'react-router-dom'

function LandingPage() {
 
   
  return (
    <div className={s.container}>
        <div className={s.videoContainer}>
            <video src={intro} autoPlay loop preload='true' muted ></video>
            
        </div>

        <div className={s.overlayContainer}> 
          
        </div>
        
        <div className={s.contentContainer}>
            <h1>Food App</h1>
            <Link to="/home">
              <button className={s.btn}> Enter App</button>
            </Link>
            <audio src={music}  autoPlay preload='none' loop></audio>
        </div>

        <div style={{position:"absolute",zIndex:"100"}}>
          <p className={s.contentContainer_p}>Welcome to my personal project for Henry's bootcamp</p>
        </div>
        
    </div>
  )
}

export default LandingPage