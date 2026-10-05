import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

const MovieCard = ({ movie, className = "",showMeta = true }) => {
  return (
    <Link
      to={`/moviedetails/${movie.id|| movie.tmdb_movie_id}`}
      className={`group relative block aspect-[2/3] ${className} `}
    >
      {/* Hover title */}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-max max-w-[240px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg border border-white/[0.08] bg-[#0c0b12]/90 px-3 py-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="mb-2 h-[2px] w-8 rounded-full bg-[#E86A4A]" />

          <p className="text-sm font-semibold leading-tight tracking-wide text-white">
            {movie.title}
            <span className="ml-1.5 font-normal text-white/40">
              {movie.release_date?.slice(0, 4)}
            </span>
          </p>
        </div>
      </div>

      {/* Poster */}
      <div className="h-full w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.025] group-hover:border-white/[0.18] group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/0 transition-all duration-300 group-hover:bg-black/15" />
      </div>

      {showMeta && (<div className="mt-1 flex h-5 items-center gap-1">
        {movie.rating ? (
          <div className="flex items-center gap-0">
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = Number(movie.rating);
              const full = rating >= star;
              const half = rating === star - 0.5;

              return (
                <div key={star} className="relative h-4 w-4">
                 
                  {full && (
                    <FaStar className="absolute h-3.5 w-3.5 text-white/60" />
                  )}

                  {half && (
                    <div className="absolute left-0 top-0 h-4 w-2 overflow-hidden">
                      <FaStar className="h-3.5 w-3.5 text-white/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-4" />
        )}

        {movie.liked && (<FaHeart
          className={`h-3.5 w-3.5 ${movie.liked ? "text-white/60" : ""
            }`}
        />)}
      </div>)}
    </Link>

  );
};

export default MovieCard;