import MovieCard from "../components/MovieCard"

function Home(){
    return (
        <div className="w-[85%] m-auto">
            <section >
                <h2>TRENDING FILMS</h2>
                <div className="flex justify-between">
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
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