export const getMovieById = async (id) => {
   // TMDB fetch here   
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`,
            {
                headers:{
                    Authorization : `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    accept : "application/json",
                }
            }
        );
          const data = await response.json();
        return data

}
