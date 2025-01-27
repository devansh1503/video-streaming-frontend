import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const mainStyle = {
        display: "flex",
        justifyContent:"space-between",
        alignItems: "center",
        padding:"10px",
    }
    const navStyle = {
        display: "flex",
        justifyContent:"space-around",
        alignItems:"center"
    }
  return (
    <div style={mainStyle}>
        <div>
            <h1 style={{color:'violet', backgroundColor:'black', padding:'9px'}}>Video-Hub</h1>
        </div>
        <div style={navStyle}>
            <Link to={"/"} className='linkText'>Connect</Link>
            <Link to={"/stream"} className='linkText'>Watch Stream</Link>
        </div>
    </div>
  )
}

export default Header