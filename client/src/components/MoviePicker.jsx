import { useEffect, useState } from "react";

const MoviePicker = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("")

        const response = await fetch(
          `http://localhost:3000/api/movies/picker-search?query=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          throw new Error("Failed to search movies. Please try again.");
        }


        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Failed to search movies:", error);
        setResults([]);
        setError(error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#353b4a] bg-[#11141c] p-5 shadow-2xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Log a Film
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-xl text-[#a2a7b4] transition hover:bg-[#292f3d] hover:text-white"
            aria-label="Close movie picker"
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a film..."
          autoFocus
          className="w-full rounded-lg border border-[#353b4a] bg-[#1d222d] px-4 py-3 text-sm text-white outline-none placeholder:text-[#858b99] focus:border-[#e9b44c]"
        />

        {query.trim() && (
          <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border border-[#353b4a] bg-[#1d222d]">

            {loading && (
              <p className="px-4 py-3 text-sm text-[#a2a7b4]">
                Searching movies...
              </p>
            )}

            {!loading && error && (
              <p className="px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {!loading && !error && results.length === 0 && (
              <p className="px-4 py-3 text-sm text-[#a2a7b4]">
                No movies found.
              </p>
            )}

            {!loading &&
              results.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => onSelect(movie)}
                  className="block w-full border-b border-[#353b4a] px-4 py-3 text-left last:border-b-0 hover:bg-[#292f3d]"
                >
                  <span className="block text-sm font-medium text-white">
                    {movie.title}

                    {movie.release_date && (
                      <span className="ml-2 font-normal text-[#a2a7b4]">
                        ({movie.release_date.slice(0, 4)})
                      </span>
                    )}
                  </span>

                  <span className="mt-1 block text-xs text-[#a2a7b4]">
                    Director: {movie.director}
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePicker;
