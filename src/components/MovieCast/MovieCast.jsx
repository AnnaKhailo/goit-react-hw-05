import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";

import Loader from "../../components/Loader/Loader";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
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
      <ul>
        {cast.map((actor) => {
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}
