import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'


const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([])
  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setWatchlist(data.watchlist)
      } else {
        alert(data.message)
      }
    }
    fetchWatchlist()
  }, [])

  return (
    <div className="min-h-screen px-8 pb-16 pt-6">
      <div className="mx-auto max-w-[1300px]">

        {/* Heading */}
        <div className="mb-9 flex items-end justify-between">
          <h1 className="text-2xl font-medium tracking-tight text-white/80">
            <span className="font-semibold text-white">
              {watchlist.length}
            </span>{" "}
            {watchlist.length === 1 ? "FILM IS" : "FILMS ARE"} IN YOUR WATCHLIST
          </h1>

          <div className="h-px flex-1 mx-8 bg-white/[0.08]" />
        </div>

        {/* Watchlist */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-6 gap-x-8 gap-y-14">
            {watchlist.map((movie, index) => (
              <div
                key={movie.tmdb_movie_id}
                
              >
                <MovieCard
                  movie={movie}
                  className="w-[175px]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-lg text-white/35">
              Your watchlist is waiting for its first film.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Watchlist
