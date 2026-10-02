import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/moviedetails/${movie.id}`}
      className="group relative block aspect-[2/3] w-[180px]"
    >
      {/* Hover title */}
      <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-full translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
    </Link>
  );
};

export default MovieCard;