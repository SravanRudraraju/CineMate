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

  // for edit profile
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)

  const handleEditProfile = () => {
    setName(profile.name || "")
    setBio(profile.bio || "")
    setLocation(profile.location || "")
    setProfileImage(profile.profile_image || "")
    setShowEditProfile(true)
  }

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token")
    const imageUrl = selectedImage ? await uploadImage() : profileImage
    
    const response = await fetch(`http://localhost:3000/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name, bio, location, profile_image: imageUrl
      })
    })
    const data = await response.json()
    if (response.ok) {
      setProfile({
        ...profile,
        name, bio, location, profile_image: imageUrl
      })
      setShowEditProfile(false)
    } else {
      alert(data.message)
    }
  }

  const uploadImage = async () => {
    if (!selectedImage) return null
    const formData = new FormData()
    formData.append("file", selectedImage)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    )
    const data = await response.json()

    if (!response.ok) {
      console.log(data)
      return null
    }
    return data.secure_url
  }

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

          <button onClick={handleEditProfile}
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
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-2xl border border-[#343a49] bg-[#1b202b] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">

            <div className="mb-7 flex items-center justify-between">
              <h2 className="font-display text-2xl font-medium text-white">
                Edit profile
              </h2>

              <button onClick={() => setShowEditProfile(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#a2a7b4] transition hover:bg-white/5 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#343a49] bg-[#151922] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777d8c] focus:border-[#e9b44c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                  className="w-full resize-none rounded-lg border border-[#343a49] bg-[#151922] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#777d8c] focus:border-[#e9b44c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-[#343a49] bg-[#151922] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777d8c] focus:border-[#e9b44c]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Profile picture
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                {selectedImage && (
                  <p className="mt-2 text-sm text-white">
                    {selectedImage.name}
                  </p>
                )}
              </div>

            </div>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#2b3140] pt-5">

              <button
                onClick={handleSaveProfile}
                className="rounded-full bg-[#e9b44c] px-6 py-2.5 text-sm font-semibold text-[#151922] transition hover:bg-[#f0c15d]"
              >
                Save changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
