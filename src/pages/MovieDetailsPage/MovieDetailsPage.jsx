import { useState, useEffect, Suspense, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { getMovieById } from "../../movies-api";

import Loader from "../../components/Loader/Loader";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
      <Link to={backLink.current}>
        <button className={css.goBackBtn}>Go back</button>
      </Link>
      {isError && <p>Oops! There was an error! Try again!</p>}
      {isLoading && <Loader />}
      {movie && (
        <div>
          <div className={css.movieDetails}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
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
              <ul className={css.genresList}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>
                    <p>{genre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={css.additionalInfo}>
            <h2>Additional information</h2>
            <ul className={css.additionalInfoList}>
              <li>
                <NavLink to="cast" className={css.castLink}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={css.reveiwsLink}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
