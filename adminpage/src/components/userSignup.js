
import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios' 
import {Outlet,Link, Navigate, redirect, useNavigate, json} from "react-router-dom";
import "./userlogin.css";
const UserMaster=()=>{
    const [Name,setName]=useState();
    const [emailId,setEmailId]=useState();
    const [passWord,setPassWord]=useState();
    const [userState,setUserState] = useState();
    const [userdetail,setUsers]=useState([]);
    const baseurl="http://localhost:3000/auth/signup";
    


    // const onSubmit = (e) => {
    //     e.preventDefault();
    // }

    // console.log(University)
        // axios.get(Getuniversity).then((response) =>{
        //     setUniversity(response.data)
        //     console.log(University)
        // })
    const navigate = useNavigate();
    const addUser=(e)=>{
        const user={username:Name,email:emailId,password:passWord};
        console.log("add product",user);
        const updUser=[...userdetail,user];
        setUsers(updUser);
        console.log(updUser);
        
        e.preventDefault();
        axios.post(baseurl,user)
        .then((response) => {  
            if(response.data.message === "User created successfully"){
                console.log("User created successfully")
                setUserState("User created successfully")
                navigate("/admin/login")
            }else{
                console.log("User already exists")
            }
        }).catch((err) => {
            console.log(err.message)
            setUserState(err.message)
        })
        clear();

    }

    const clear=()=>{
        setName('');
        setEmailId('')
        setPassWord('');
        setUserState('');
    }

    // const displayusers=users.map((user)=><tr>
    //     <td>{user.firstName}</td>
    //     <td>{user.lastName}</td>
    //     <td>{user.email}</td>
    //     <td>{user.password}</td>
    //     <td>{user.university}</td>
    // </tr>)

    // const displayUniversity=()=>{
    //     University.map((items) =>{return <option value={items.College_Name}>{items.College_Name}</option>})
    // }
        // University.map((items) =>{
        // return <option value={items.College_Name}>{items.College_Name}</option>
        // }
    

    return(
        <div className="OuterBox">
        <div class="wrapper">
            {/* <h1>signup</h1>
            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='Enter first name'></input><br/>
            <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Enter lastname'></input><br/>
            <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} placeholder='Enter email'></input><br/>
            <input value={passWord} onChange={(e)=>setPassWord(e.target.value)} type='password' placeholder='Enter password'></input><br/>
            <input value={University} onChange={(e)=>setUniversity(e.target.value)} placeholder='Enter university'></input><br/>
            <button onClick={addUser}>Add user</button>
            <div class="wrapper"> */}
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
    <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone"
            rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link
            href="https://fonts.googleapis.com/css2?family=Foldit:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
    />





    <form  >
        {/* {University.map(items => {
        return <div>{items.College_Name}</div>
        })}  */}
        <h1>Sign Up</h1>
        <div class="input-box">
            <input type="text" placeholder="Name" value={Name} onChange={(e)=>setName(e.target.value)} required/>
            <i class="bx bxs-user"></i>
        </div>
        <div class="input-box">
            <input type="email" placeholder="E-Mail ID" value={emailId} onChange={(e)=>setEmailId(e.target.value)} required/>
            <i class="bx bxs-user"></i>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Password" value = {passWord} onChange={(e)=>setPassWord(e.target.value)}  required/>
            <i class="bx bxs-lock-alt"></i>

        </div>
        
        
        <div class="remember-forgot">
            <label><input type="checkbox"/> Remember me</label>
        </div>
        <button type="submit" class="btn" onClick={addUser}>Sign up</button>

        <div class="register-link">
            <p>Already have an account? <Link to={"/Login"}>Login</Link></p>
        </div>
    </form>
</div>


        
        </div>
    )
}

export default UserMaster