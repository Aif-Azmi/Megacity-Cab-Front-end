import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='text-amber-300'>Hader
    
    <Link to="login" className='p-3 bg-amber-700 text-white w-fit'>login</Link>
    </div>
  )
}

export default Header