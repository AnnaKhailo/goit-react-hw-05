import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";

import Loader from "../../components/Loader/Loader";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;
    async function fetchCastById() {
      try {
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCastById();
  }, [movieId]);

  return (
    <div>
      {isError && <p>Oops! There was an error! Try again!</p>}
      {isLoading && <Loader />}
      <h2>Actors:</h2>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
            />
            <div>
              <p className={css.actorName}>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
