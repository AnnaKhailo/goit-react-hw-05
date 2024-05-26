import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster movie"
              width="240"
            />
            <h3>{movie.title} </h3>
            <p>Date of release: {movie.release_date.slice(0, 4)}</p>
            <p>Average voite: {movie.vote_average}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
