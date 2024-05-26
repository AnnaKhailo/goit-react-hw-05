import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../movies-api";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      {isError && <p>Oops! There was an error! Try again!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
    </div>
  );
}
