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
    <div className="min-h-screen px-8 pb-20 pt-8 text-white">
      <div className="mx-auto max-w-[1350px]">

        {/* Profile Header */}
        <section className="relative border-b border-white/[0.08] pb-12">
          <div className="flex items-end justify-between">

            <div className="flex items-center gap-7">

              {/* Profile Image */}
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
                <img
                  src={profile.profile_image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Identity */}
              <div>
                <h1 className="text-4xl font-medium tracking-tight text-white">
                  {profile.name}
                </h1>

                <p className="mt-1 text-sm text-white/40">
                  {profile.username}
                </p>

                <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/65">
                  {profile.bio}
                </p>

                <div className="mt-4 flex items-center gap-5 text-xs text-white/35">
                  <span>{profile.location}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />

                </div>
              </div>

            </div>

            {/* Edit Button */}
            <button className="rounded-full border border-white/10 px-5 py-2 text-xs tracking-wide text-white/55 transition hover:border-white/25 hover:text-white">
              EDIT PROFILE
            </button>

          </div>
        </section>


        {/* Favourite Movies */}
        <section className="pt-12">

          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-white/30">
                PERSONAL COLLECTION
              </p>

              <h2 className="mt-2 text-2xl font-medium text-white/90">
                Favourite films
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-7">
            {/* Favourite Movie */}
            {favourites.map((movie) => (
              <MovieCard
                key={movie.tmdb_movie_id}
                movie={{
                  id: movie.tmdb_movie_id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                }}
                className="w-[180px]"
                showMeta={false}
              />
            ))}
          </div>
        </section>


        {/* Recent Diary */}
        <section className="mt-20">

          <div className="mb-7 flex items-end justify-between border-b border-white/[0.08] pb-4">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-white/30">
                CINEMA JOURNAL
              </p>

              <h2 className="mt-2 text-2xl font-medium text-white/90">
                Recently watched
              </h2>
            </div>

            <button className="text-xs tracking-wide text-white/35 transition hover:text-white/70" onClick={() => navigate("/diary")} >
              SEE DIARY →
            </button>
          </div>


          {/* Diary Entry */}
          <div className="grid grid-cols-5 gap-7">
            {recentMovies.map((movie) => (
              <MovieCard
                key={movie.tmdb_movie_id}
                movie={movie}
                className="w-[180px]"
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Profile
