import {React, useState, useEffect} from 'react'
import intro from "../../media/video/intro.mp4"
import s from "./landingPage.module.css"
import music from "../../media/music/musicLanding.mp3"
import { Link } from 'react-router-dom'

function LandingPage() {
    const musics = new Audio(`${music}`)
    
    const [playing, setPlaying] = useState(false)

    useEffect(()=>{
      musics.play()
    })
    // useEffect(() => {
    //   toggle()
    // }, [])
    
   
  return (
    <div className={[s.container,s.content].join(" ")}>
        <div className={s.videoContainer}>
            <video src={intro} autoPlay loop preload='true' muted ></video>
        </div>

        <div className={s.overlayContainer}> </div>

        <div className={s.contentContainer}>
            <h1>Food App</h1>
            <p>Welcome to my personal project for Henry's bootcamp</p>
            <Link to="/home"><button className={s.btn}> Enter App</button></Link>
            <audio src={music} controls="controls" autoPlay preload='true' loop></audio>
        </div>
        
    </div>
  )
}

export default LandingPage