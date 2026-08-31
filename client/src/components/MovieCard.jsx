import React from 'react'
import poster from "../assets/sampleposter.jpg"
import { Link } from 'react-router-dom'

const MovieCard = () => {
  return (
    <Link to = "/moviedetails"className='w-[180px] aspect-2/3 overflow-hidden border-amber-600'>
      <img src={poster} alt="" className='w-full h-full object-cover'/>
    </Link>
  )
}

export default MovieCard
