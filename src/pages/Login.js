import axios from 'axios';
import React, { useRef, useState } from 'react'

function Login({setLogin}) {
    const [newUser, setNewUser] = useState(false);
    const username = useRef("")
    const password = useRef("")
    const streamKey = useRef("")

    const mainStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%',
    }
    const login = async() =>{
        let url = `http://localhost:4000/${newUser?"register":"login"}`
        const data = {
            username:username.current.value,
            password: password.current.value,
            streamKey: streamKey.current.value
        }
        await axios.post(url, data).then((res)=>{
            console.log(res)
            if(res.status === 201 || res.status === 200){
                setLogin(true)
                localStorage.setItem("userCred", JSON.stringify({...data, streamKey:res?.data?.streamKey}))
            }
            else{
                if(res?.data?.message){
                    alert(res.data.message)
                }
                else alert("Not able to login")
            }
        }).catch((error)=>{
            console.log(error)
            alert(error)
        })
    }
  return (
    <div style={mainStyle}>
        {
            !newUser &&
             <div className='form'>
                <h2 style={{color:'grey'}}>Login/Register</h2>
                <input ref={username} placeholder='Enter Username'></input>
                <input ref={password} placeholder='Enter Password'></input>
                <button onClick={login}>Login</button>
                <button onClick={()=>setNewUser(true)}>Register New-User</button>
             </div>
        }
        {
            newUser && 
            <div className='form'>
                <h2 style={{color:'grey'}}>Login/Register</h2>
                <input ref={username} placeholder='Set Unique Username'></input>
                <input ref={password} placeholder='Set Password'></input>
                <input ref={streamKey} placeholder='Set a Unique StreamKey'></input>
                <button onClick={login}>Register</button>
            </div>
        }
    </div>
  )
}

export default Login