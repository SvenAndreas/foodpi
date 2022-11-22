import React, { useRef, useEffect, useState } from "react";
import s from "./Footer.module.css";
import footer from "../../media/images/footer.png";
import linked from "../../media/images/linkedIn.png";
import git from "../../media/images/git.png";
import whatsapp from "../../media/images/whatsapp.png";
import send from "../../media/images/send.png";

function Footer() {
  const myRef = useRef();
  const [isVisible, setIsVisibe] = useState();

  useEffect(() => {
    // console.log("my ref", myRef.current)
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // console.log("entry",entry)
      setIsVisibe(entry.isIntersecting);
    });
    observer.observe(myRef.current);
  }, []);

  return (
    <div ref={myRef} className={isVisible ? s.container : s.container_visible}>
      <div className={s.back}>
        <img className={s.back_img} src={footer} alt="footer" />
      </div>

      <div className={s.container_info}>
        <div className={s.container_project_description}>
          <h3>APP for Henry's bootcamp</h3>
          <p>Using:</p>
          <div className={s.container_skills}>
            <span className={s.react}>React Js</span>
            <span className={s.node}>Node Js</span>
            <span className={s.sequelize}>Sequelize</span>
            <span className={s.javaScript}>JavaScript</span>
            <span className={s.postgres}>Postgres</span>
          </div>
        </div>

        <div className={s.container_personal}>
          <h3>Contact me</h3>
          <div className={s.container_email}>
            <a className={s.container_email} href="mailto:svenandreasclauz@gmail.com" >
              <img src={send} alt="send email" />
              <p>E-mail: svenandreasclausz@gmail.com</p>
            </a>
          </div>
          <div className={s.container_whatsapp}>
            <a className={s.container_whatsapp} href="https://web.whatsapp.com/send?phone=541133671001" rel="noreferrer" target="_blank">
              <img src={whatsapp} alt="whasapp" />
              <p>Whatsapp : +541133671001</p>
            </a>
          </div>
          <a className={s.a_linked} href="https://www.linkedin.com/in/sven-andreas-clausz" rel="noreferrer" target="_blank">
            <img src={linked} alt="linkedIn" />
            LinkedIn
          </a>
          <a className={s.a_git} href="https://github.com/svenAndreas" rel="noreferrer" target="_blank">
            <img src={git} alt="gitHub" />
            GitHub
          </a>
        </div>
      </div>

      <div className={s.container_rights}>
        <div>
          Made with <span style={{color:"#c44569"}}>♥</span> by Sven Andreas Clausz
        </div>
      </div>
    </div>
  );
}

export default Footer;
