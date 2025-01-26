import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const mainStyle = {
        display: "flex",
        justifyContent:"space-between",
        alignItems: "center",
        padding:"10px",
        backgroundColor:"#FF3399"
    }
    const navStyle = {
        display: "flex",
        justifyContent:"space-around",
        alignItems:"center"
    }
  return (
    <div style={mainStyle}>
        <div>
            <h1>Video-Hub</h1>
        </div>
        <div style={navStyle}>
            <Link to={"/"} className='linkText'>Connect</Link>
            <Link to={"/go-live"} className='linkText'>Go Live</Link>
            <Link to={"/stream"} className='linkText'>Stream</Link>
        </div>
    </div>
  )
}

export default Header