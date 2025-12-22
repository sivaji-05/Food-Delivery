import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {
  const {url,setToken} = useContext(StoreContext)
    const [currState, setCurrState] = React.useState("Login");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHnadler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData({...data,[name]:value})
    }

    const onLogin = async (event)=>{
      event.preventDefault()
      let newUrl = url;
      if(currState==="login"){
        newUrl +="/api?user?login"
      }
      else{
        newUrl +="/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }


    }

   

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
              <h2>{currState}</h2>  
              <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHnadler} value={data.name} type="text" placeholder='Enter your name' required/>}
                <input name='email' onChange={onChangeHnadler} value={data.email} type="email" placeholder='Enter your email' required/>
                <input name='password' onChange={onChangeHnadler} value={data.password} type="password" placeholder='Enter your password' required/>
            </div>
            <button type='submit'>{currState==="Signup"?"Creat account":"Login"}</button>
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
