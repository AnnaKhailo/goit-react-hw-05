import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../movies-api";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noMoviesByQuery, setNoMoviesByQuery] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovies(query);
        setMovies(data.results);
        if (!data.total_results) {
          setNoMoviesByQuery(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  const handleSearch = async (value) => {
    setSearchParams({ query: value });
    setMovies([]);
    setNoMoviesByQuery(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isError && <p>Oops! There was an error! Try again!</p>}

      {movies.length > 0 && <MovieList movies={movies} />}

      {isLoading && <Loader />}

      {noMoviesByQuery && (
        <p className={css.noMovies}>
          Sorry, there are no movies matching your search query. Please try
          again.
        </p>
      )}
    </div>
  );
}
