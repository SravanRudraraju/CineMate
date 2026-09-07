import React from 'react'
import poster from "../assets/sampleposter.jpg"

import { Link ,useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
 
  return (
    
    <Link to = {`/moviedetails/${movie.id}`} className='w-[180px] aspect-2/3 overflow-hidden border-amber-600'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='w-full h-full object-cover'/>
    </Link>
  )
}

export default MovieCard
