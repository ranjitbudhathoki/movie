import { useEffect, useState } from "react";

const KEY = "1dc6c1c2";
export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();

        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <Header query={query} setQuery={setQuery} />
      <main className="px-3">
        <MovieList movies={movies} />
      </main>
      <Footer movieCount={movies.length} />
    </div>
  );
}

function Header({ setQuery, query }) {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 mb-3">
      <span role="logo" className="font-serif font-bold">
        MovieDB
      </span>
      <input
        type="text"
        placeholder="Search for movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-stone-2000 text-sm transition-all duration-300 rounded-full w-28 px-4 py-2 sm:w-64 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 sm:focus:w-74 placeholder:text-sm"
      />
    </header>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="px-3 list-none h-auto flex flex-wrap gap-4 justify-around">
      {movies?.map((movie) => (
        <li
          key={movie.imdbID}
          className="w-[100%] p-4 mx-auto max-w-xs sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gray-200  rounded-xl"
        >
          <img src={movie.Poster} alt={movie.Title} className="h-34 w-full" />
          <div>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
function Footer({ movieCount }) {
  return (
    <footer className="bg-yellow-500 p-4 text-center">
      <p>You have {movieCount} results.</p>
    </footer>
  );
}
