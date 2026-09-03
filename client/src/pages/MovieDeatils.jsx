import React, { useState } from 'react'
import background from "../assets/backgroundimage.jpg"
import poster from "../assets/sampleposter.jpg"
import { Link, useNavigate } from 'react-router-dom'
import {
  FaRegClock, FaClock, FaRegEye, FaEye, FaRegHeart, FaHeart, FaRegStar, FaStar, FaRegEdit
} from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
const MovieDeatils = () => {
  const movie = {
    title: "The Odyssey",
    year: 2026,
    runtime: 172,
    genres: ["Adventure", "Action", "Fantasy"],
    director: "Christopher Nolan",
    description:
      "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
    imdbUrl: "https://www.imdb.com/title/tt33764258/",
    trailerUrl: "https://www.youtube.com/embed/f_bKjZeJBBI?si=Ppy8MhRhMg0zjfD3",
    whereToWatch: ["Netflix", "Prime Video"]

  };
  const [watched, setWatched] = useState(false)
  const [liked, setLiked] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)

  return (
    <div className='relative min-h-screen'>
      <div className='fixed inset-0 bg-cover bg-center -z-10' style={{ backgroundImage: `url(${background})` }} />
      <div className='fixed inset-0 -z-10 bg-black-50' />
      <div className='fixed inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/60 to-black/80' />

      <main className="px-12 py-8 text-white">
        <div className="max-w-6xl mx-auto mt-4 flex items-center gap-14">

          {/* Poster */}
          <img
            className="h-[400px] w-[267px] shrink-0 object-cover rounded-lg border border-white/20 shadow-2xl"
            src={poster}
            alt={movie.title}
          />

          {/* Movie Information */}
          <div className="max-w-2xl">

            {/* Title */}
            <h1 className="text-5xl font-bold tracking-tight">
              {movie.title}
            </h1>

            {/* Metadata */}
            <p className="mt-4 text-lg text-white/70">
              {movie.year} <span className="mx-2">•</span> {movie.runtime} mins
            </p>

            {/* Genres */}
            <div className="flex gap-3 mt-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Director */}
            <p className="mt-7 text-lg text-white/70">
              Directed by{" "}
              <span className="text-white font-medium">
                {movie.director}
              </span>
            </p>

            {/* Description */}
            <p className="mt-5 max-w-xl text-lg leading-7 text-white/80">
              {movie.description}
            </p>

          </div>
          {/* imdb */}
          <div className=' w-[350px] shrink-0'>
            <a href={movie.imdbUrl} target="_blank" className='group flex items-center justify-between border-b border-white/20 pb-4'>
              <div>
                <p className='text-xs uppercase tracking-[0.2em] text-white/50'>IMDb</p>
                <p className='mt-1 text-2xl font-semibold text-white group-hover:text-yellow-400 transition'>8.4/10</p>
              </div>
              <span className='text-white/40 text-xl group-hover:text-white transition'>
                ↗
              </span>
            </a>

            {/* trailer */}
            <div className='mt-6'>
              <p className="mb-3 text-xs tracking-[0.2em] text-white/50">
                TRAILER
              </p>
              <div className="overflow-hidden rounded-xl border border-white/15 shadow-xl">
                <iframe className='w-full aspect-video rounded-lg' src={movie.trailerUrl} title={`${movie.title}  trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>

            </div>

            <div className='mt-7 border-t border-white/20 pt-5'>
              <p className='text-xs tracking-[0.2em] text-white/50'>WHERE TO WATCH</p>
              <div className='mt-3'>
                {movie.whereToWatch.map((ott) => (
                  <div key={ott} className='flex items-center justify-between py-3 border-b border-white/10 text-white/80 hover:text-white transition'>
                    <span>{ott}</span>
                    <span className='text-white/30'>→</span>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* action bar */}
        <div className='w-[70%] m-auto mt-10 flex justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-8 py-5'>

          <button className="group flex flex-col w-28 items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white"
            onClick={()=>{
              !watched ? setWatched(true) : setWatched(false)
            }}>
              <span className='text-4xl transition-transform duration-200 group-hover:scale-110'>  {watched ? <FaEye className='text-green-700'/> : <FaRegEye />} </span>
              <span className='text-base'>{watched ? "WATCHED" : "WATCH"}</span>
          </button>

          <button className="group flex flex-col w-28 items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white"
            onClick={()=>{
              !liked ? setLiked(true) : setLiked(false)
            }}>
             <span className='text-4xl transition-transform duration-200 group-hover:scale-110'> {liked ? <FaHeart className='text-pink-800'/> : <FaRegHeart />}</span> 
             <span className='text-base'>{liked ? "LIKED":"LIKE"}</span>
             
          </button>

          <button className="group flex flex-col w-28 items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white">
             <span className='text-4xl transition-transform duration-200 group-hover:scale-110'> <FaRegStar/></span> 
             <span className='text-base'>RATE</span>
          </button>
          

          <button className="group flex flex-col w-28 items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white">
             <span className='text-4xl transition-transform duration-200 group-hover:scale-110'> <FaRegEdit/></span> 
             <span className='text-base'>REVIEW</span>
             
          </button> 

          <button className="group flex flex-col w-28 items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white"
            onClick={()=>{
              !watchlisted ? setWatchlisted(true) : setWatchlisted(false)
            }}>
              <span className='text-4xl transition-transform duration-200 group-hover:scale-110'>{watchlisted ? <FaClock className='text-orange-400/80'/> : <FaRegClock />}</span>
              <span className='text-base'>{watchlisted ? "IN WATCHLIST":"WATCHLIST"}</span> 
          </button>

          <div className="group flex flex-col items-center gap-2 cursor-pointer text-white/60 transition duration-200 hover:text-white">
            <button className='w-28 flex flex-col items-center text-3xl transition-transform duration-200 group-hover:scale-110'><MdPlaylistAdd /></button>
            <p className = "text-md">ADD TO LISTS...</p>
          </div>

        </div>
      </main>


    </div>

  )
}

export default MovieDeatils
