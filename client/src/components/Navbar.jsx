import React from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate ,useLocation } from 'react-router-dom'
import { useState } from "react";


const Navbar = () => {
  const [query ,setQuery] = useState("")
  const navigate = useNavigate()
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleSearch = (e) => {
    e.preventDefault()
    if(!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query)}`)
  }
  return (
  <nav className={`${isHome ? "absolute top-0 left-0 right-0":"relative"}  z-20 mx-auto flex h-24 w-[85%] max-w-[1500px] items-center justify-between`}>

    {/* Logo */}
    <Link to="/" className="shrink-0">
      <img
        className="h-30 w-60 object-contain"
        src={logo}
        alt="CineMate"
      />
    </Link>


    {/* Center navigation */}
    <div className="flex items-center gap-8">

      <Link
        to="/watchlist"
        className="text-lg font-bold tracking-wide text-white/80 transition duration-200 hover:text-[#FF6B1A]"
      >
        WATCHLIST
      </Link>

      <Link
        to="/diary"
        className="text-lg font-bold tracking-wide text-white/80 transition duration-200 hover:text-[#FF6B1A]"
      >
        DIARY
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            className="w-72 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-md transition duration-300 focus:border-[#FF6B1A]/50 focus:bg-white/10"
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

    </div>


    {/* Profile */}
    <Link
      to="/profile"
      className="text-base font-medium tracking-wide text-white/80 transition duration-200 hover:text-[#FF6B1A]"
    >
      PROFILE
    </Link>

  </nav>
);
}

export default Navbar
