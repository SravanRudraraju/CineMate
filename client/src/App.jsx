import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Profile from './pages/Profile'
import MovieDeatils from './pages/MovieDeatils'
import Watchlist from './pages/watchlist'
import Diary from './pages/Diary'
import Search from './pages/Search'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/profile" element={<Profile/>}/>
          <Route path = "/moviedetails" element={<MovieDeatils/>}/>
          <Route path = "/watchlist" element={<Watchlist/>}/>
          <Route path = "/diary" element={<Diary/>}/>
          <Route path = "/search" element={<Search/>}/>
        </Routes>
      </div>  
  )
}

export default App
