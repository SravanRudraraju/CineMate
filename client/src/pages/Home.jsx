import React, { useState, useEffect } from 'react'
import MovieCard from "../components/MovieCard"


function Home() {
    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await fetch("http://localhost:3000/api/movies/trending")
            const data = await response.json()
            console.log("trending ", data)
            setTrendingMovies(data.results)
        }
        fetchTrendingMovies()
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#08090D]">
 
            <div className="pointer-events-none absolute -top-60 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#FF6B1A]/[0.05] blur-[160px]" />

            <main className="relative mx-auto w-[85%] max-w-[1500px] py-16">

                {/* TRENDING */}
                <section className="mb-28">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-7 w-[3px] rounded-full bg-[#FF6B1A]"/>
                        <h2 className="text-3xl font-semibold tracking-wide text-white">
                            TRENDING NOW
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {trendingMovies.slice(0, 6).map((movie) => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                            />
                        ))}
                    </div>
                </section>

                {/* FOR YOU */}
                <section className="mb-28">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-7 w-[3px] rounded-full bg-[#FF6B1A]" />

                        <h2 className="text-3xl font-semibold tracking-wide text-white">
                            FOR YOU
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {trendingMovies.slice(0, 6).map((movie) => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                            />
                        ))}
                    </div>

                </section>


                {/* FROM PEOPLE YOU FOLLOW */}
                <section className="mb-28">

                    <div className="flex items-center gap-4">
                        <div className="h-7 w-[3px] rounded-full bg-[#FF6B1A]" />

                        <h2 className="text-3xl font-semibold tracking-wide text-white">
                            FROM PEOPLE YOU FOLLOW
                        </h2>
                    </div>

                </section>


                {/* COMMUNITY LISTS */}
                <section>

                    <div className="flex items-center gap-4">
                        <div className="h-7 w-[3px] rounded-full bg-[#FF6B1A]" />

                        <h2 className="text-3xl font-semibold tracking-wide text-white">
                            COMMUNITY LISTS
                        </h2>
                    </div>

                </section>

            </main>
        </div>
    );
}
export default Home