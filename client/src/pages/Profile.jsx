import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MovieCard from "../components/MovieCard"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState([])
  const [favourites, setFavourites] = useState([])
  const [recentMovies, setRecentMovies] = useState([])
  console.log(recentMovies);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setProfile(data.profile_data)
        setFavourites(data.favourite_movies)
        setRecentMovies(data.recent_movies)
      }
      else {
        alert(data.message)
      }
    }
    fetchProfile()
  }, [])
  return (
   

<div className="min-h-screen bg-[#151922] px-5 pb-20 pt-8 text-[#ece8df] sm:px-8">
  <div className="mx-auto max-w-[1100px]">

    <header className="flex flex-col gap-7 border-b border-[#2b3140] pb-9 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-6">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#1d222d] ring-1 ring-[#353b4a] ring-offset-4 ring-offset-[#151922]">
          {profile.profile_image && (
            <img
              src={profile.profile_image}
              alt={`${profile.name}'s avatar`}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0 pt-1">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
            {profile.name}
          </h1>

          <p className="mt-1.5 text-sm text-[#a2a7b4]">
            @{profile.username}
          </p>
          {profile.location && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-[#a2a7b4]">
              
              <span>📍 {profile.location}</span>
            </div>
          )}

          {profile.bio && (
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#ece8df]/85">
              {profile.bio}
            </p>
          )}

          
        </div>
      </div>

      <button
        className="self-start rounded-full border border-[#363c4b] px-5 py-2 text-sm font-medium text-[#ece8df]/85 transition duration-200 hover:border-[#e9b44c] hover:bg-[#e9b44c]/5 hover:text-[#e9b44c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c]"
      >
        Edit profile
      </button>
    </header>

    <section className="mt-11">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-5 w-1 rounded-full bg-[#e9b44c]" />

        <h2 className="font-display text-2xl font-medium text-white">
          Favourite films
        </h2>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6">
        {favourites.map((movie) => (
          <MovieCard
            key={movie.tmdb_movie_id}
            movie={{
              id: movie.tmdb_movie_id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
            }}
            className="w-[110px] sm:w-[160px]"
            showMeta={false}
          />
        ))}
      </div>
    </section>

    <section className="mt-14">
      <div className="mb-5 flex items-center justify-between border-b border-[#2b3140] pb-3">
        <h2 className="font-display text-xl font-medium text-white">
          Recently watched
        </h2>

        <button
          onClick={() => navigate("/diary")}
          className="text-sm font-medium text-[#a2a7b4] transition duration-200 hover:text-[#e9b44c]"
        >
          Open diary →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {recentMovies.map((movie) => (
          <MovieCard
            key={movie.tmdb_movie_id}
            movie={movie}
            className="w-full"
          />
        ))}
      </div>
    </section>

  </div>
</div>
  )
}

export default Profile
