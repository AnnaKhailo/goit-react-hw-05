import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getMovieById } from "../../movies-api";

import Loader from "../../components/Loader/Loader";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieById() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div>
      <button className={css.goBackBtn}>Go back</button>
      {isError && <p>Oops! There was an error! Try again!</p>}
      {isLoading && <Loader />}
      {movie && (
        <div>
          <div className={css.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster movie"
              width="300"
            />
            <div>
              <h3 className={css.movieTitle}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h3>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((genre) => {
                  <li key={genre.id}>
                    <p>{genre.name}</p>
                  </li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
