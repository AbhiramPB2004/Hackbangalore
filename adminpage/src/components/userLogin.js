import axios from "axios";
import React from "react";
import { useState } from "react";
import {Outlet,Link, Navigate, redirect, useNavigate} from "react-router-dom"
import "./userlogin.css";
const UserLogin =()=>{
    const navigate = useNavigate();
    const [emailId,setEmailId]=useState();
    const [passWord,setPassWord]=useState();
    const [userdetail,setUsers]=useState([]);
    const[userAuth,setUserAuth] = useState();
    const baseurl="http://localhost:3000/auth/login";  
    const clear=()=>{
        setEmailId('')
        setPassWord('');
    }


    

    const GetUser = () =>{
        const user={email:emailId,password:passWord};
        const updUser=[...userdetail,user];
        setUsers(updUser);
        axios.post(baseurl,user)
        .then((response)=>{
            const data = response.data
            if(data.message === "User logged in successfully"){
                navigate("/admin/dashboard" ,{state:{data}})
            }else{
                setUserAuth("INCORRECT DETAILS")
            }

        }).catch((err)=>{
            console.log(err)
            setUserAuth("INCORRECT DETAILS")
        })

        clear();
        
    }
    return (
        <div className="OuterBox">
          <div className="wrapper">
            <form>
              <h1>Login</h1>
              <center>
                <div className="DetailStatus">{userAuth}</div>
              </center>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email ID"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                />
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={passWord}
                  onChange={(e) => setPassWord(e.target.value)}
                  required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
      
              <button type="submit" onClick={GetUser} className="btn">
                Login
              </button>
      
              <div className="register-link">
                <p>
                  Don't have an account? <Link to={"/Signup"}>Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
    
}
export default UserLogin