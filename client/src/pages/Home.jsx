import React, { useState, useEffect } from 'react'
import MovieCard from "../components/MovieCard"


function Home() {
    const [trendingMovies,setTrendingMovies] = useState([])

    useEffect(()=>{
    const fetchTrendingMovies = async() =>{
      const response = await fetch("http://localhost:3000/api/movies/trending")
      const data = await response.json()
      console.log("trending ",data)
      setTrendingMovies(data.results)
    }
    fetchTrendingMovies()
  },[])

    return (
        <div className="w-[85%] m-auto">
            <section >
                <h2>TRENDING FILMS</h2>
                <div className="flex justify-between">                  
                    {trendingMovies.slice(0,6).map((movie) => (
                        <MovieCard  movie = {movie} key = {movie.id}  />      
                ))}
                </div>
                

            </section>
            <section>
                <h2>FOR YOU</h2>

            </section>
            <section>
                <h2>FROM PEOPLE YOU FOLLOW</h2>

            </section>
            <section>
                <h2>COMMUNITY LISTS</h2>
            </section>

        </div>
    )
}
export default Home