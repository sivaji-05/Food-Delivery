import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = React.useState("Signup");
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
              <h2>{currState}</h2>  
              <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Enter your name' required/>}
                <input type="email" placeholder='Enter your email' required/>
                <input type="password" placeholder='Enter your password' required/>
            </div>
            <button>{currState==="Signup"?"Creat account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By Continuing, I Agree To The Terma Of User & Privacy Policy</p>
            </div>
            {currState==="Login"?
            <p>Creat a new Account? <span onClick={()=>setCurrState("Signup")} >Click Here </span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}> Login here</span></p>}
        </form> 
    </div>
  )
}

export default LoginPopup
