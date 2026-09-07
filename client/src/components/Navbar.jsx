import React from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";


const Navbar = () => {
  const [query ,setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if(!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query)}`)
  }
  return (
    <nav className='w-[85%] mx-auto  top-0 flex items-center justify-between'>
      <div><Link to="/"><img className='w-50 h-20 ' src={logo} alt="cinemate" /></Link></div> 
      <div className='  flex gap-6 items center justify-between '>
        <Link to="/watchlist">WATCHLIST</Link>
        <Link to="/diary">DIARY</Link>
        <form onSubmit={handleSearch}>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" type="search" placeholder='search movies'
        value={query} onChange={(e)=> setQuery(e.target.value)} />

        </form>
        
      </div>
      <Link to="/profile"><h2>PROFILE</h2></Link>
    </nav>
  )
}

export default Navbar
