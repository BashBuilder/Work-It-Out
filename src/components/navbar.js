import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="left-header">
        <Link to="/">
            <h1>Timmy</h1>
        </Link>
      </div>
      <div className="right"></div>
    </div>
  )
}

export default Navbar