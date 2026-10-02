import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState } from 'react'
import { useEffect } from 'react'

const Watched = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem("token")

            const response = await fetch(`http://localhost:3000/api/watched`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await response.json()
            if (response.ok) {
                setMovies(data.watched_movies)
            } else {
                alert(data.message)
            }
        }
        fetchMovies()
    }, [])

    return (
        <div className="min-h-screen px-8 pb-16 pt-10">
            {/* Header */}
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                        FILMS
                    </h1>

                    <p className="text-base font-medium text-white/45">
                        {movies.length} {movies.length === 1 ? "FILM" : "FILMS"}
                    </p>
                </div>

                {/* Movies */}
                {movies.length > 0 ? (
                    <div className="mt-8 grid grid-cols-10 gap-x-6 gap-y-8">
                        {[...movies]
                            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                            .map((movie) => (
                                <MovieCard
                                    key={movie.tmdb_movie_id}
                                    movie={movie}
                                    className="w-[110px]"
                                />
                            ))}
                    </div>
                ) : (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg font-medium text-white/60">
                                No watched movies yet
                            </p>

                            <p className="mt-2 text-sm text-white/30">
                                Movies you mark as watched will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Watched
