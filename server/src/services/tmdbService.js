
const tmdbFetch = async (url) => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
    }

    return response.json();
};

export const getMovieById = async (id) => {
    return tmdbFetch(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`
    );
};

export const getTrendingMovies = async () => {
    return tmdbFetch(
        "https://api.themoviedb.org/3/trending/movie/week"
    );
};

export const searchMovie = async (query) => {
    return tmdbFetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
    );
};
